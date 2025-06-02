"use client";

import type { Study, User } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import StudyCard from "../ui/card/StudyCard";
import StudyCardSkeleton from "./StudyCardSkeleton";

type StudyType = Study & {
  author: Pick<User, "id" | "nickname" | "profileImage">;
  _count: {
    comments: number;
  };
};

export default function StudyList() {
  const [studies, setStudies] = useState<StudyType[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const searchParams = useSearchParams();
  const studyType = searchParams.get("studyType");
  const category = searchParams.get("category");
  const query = searchParams.get("query");
  const status = searchParams.get("status");

  const fetchStudies = async (reset = false) => {
    if (loading) return;
    setLoading(true);

    try {
      const params = new URLSearchParams();
      if (cursor && !reset) params.append("cursor", cursor.toString());
      if (category) params.append("category", category);
      if (query) params.append("query", query);
      if (studyType) params.append("studyType", studyType);
      if (status) params.append("status", status);

      const res = await fetch(`/api/studies?${params.toString()}`);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log(data);

      if (reset) {
        setStudies(data.posts);
      } else {
        setStudies((prev) => [...prev, ...data.posts]);
      }

      setCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setStudies([]);
    setCursor(null);
    setHasMore(true);
    setInitialized(false);
    fetchStudies(true).then(() => setInitialized(true));
  }, [category, query, studyType, status]);

  useEffect(() => {
    if (!observerRef.current || !hasMore || loading || !initialized) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && cursor) {
          fetchStudies();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasMore, loading, cursor, initialized]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">스터디 목록</h2>
        <span className="text-sm text-gray-500">
          {studies.length}개의 스터디
        </span>
      </div>

      {/* 카드 영역 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!initialized && loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <StudyCardSkeleton key={i} />
            ))
          : studies.map((study, index) => (
              <StudyCard
                key={study.id}
                study={study}
                isLast={index === studies.length - 1}
                observerRef={observerRef}
              />
            ))}
      </div>

      {/* 데이터 다 로드 후, 아무 것도 없을 때 */}
      {initialized && studies.length === 0 && (
        <div className="text-center py-12 col-span-3 w-full">
          <div className="text-gray-400 text-6xl mb-4">📚</div>
          <p className="text-gray-500 text-lg">등록된 글이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
