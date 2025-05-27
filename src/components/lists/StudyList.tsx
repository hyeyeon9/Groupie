"use client";
import { formatRelativeTime } from "@/lib/date";
import type { Comment, Study, User } from "@prisma/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type StudyType = Study & {
  author: User;
  comments: Comment[];
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

  const today = new Date();
  today.setHours(0, 0, 0, 0); // 오늘 00:00:00

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

      console.log("parmas", status, studyType, category);

      const res = await fetch(`/api/studies?${params.toString()}`);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (reset) {
        setStudies(data.posts);
      } else {
        setStudies((prev) => [...prev, ...data.posts]);
      }

      setCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Failed to fetch studies:", error);
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

  if (!initialized && loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">로딩 중...</span>
      </div>
    );
  }

  if (initialized && studies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📚</div>
        <p className="text-gray-500 text-lg">등록된 글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">스터디 목록</h2>
        <span className="text-sm text-gray-500">
          {studies.length}개의 스터디
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studies.map((study, index) => (
          <Link href={`/study/${study.id}`} key={study.id}>
            <div
              ref={index === studies.length - 1 ? observerRef : null}
              className="group bg-white rounded shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-5">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200">
                    {study.category}
                  </span>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      study.startDate && new Date(study.startDate) < today
                        ? "bg-gray-300 text-gray-500"
                        : "bg-green-200 text-green-700"
                    }`}
                  >
                    {study.startDate && new Date(study.startDate) < today
                      ? "모집 마감"
                      : "모집중"}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900  transition-colors line-clamp-1">
                    {study.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {study.content
                      .replace(/[#_*~`>[\]()\-!\n]/g, "")
                      .slice(0, 100)}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>{formatRelativeTime(new Date(study.createdAt))}</span>
                  <span>•</span>
                  <span>{study.comments.length}개의 댓글</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-xs text-gray-600">👤</span>
                    </div>
                    <span className="text-sm text-gray-700 font-medium">
                      {study.author.nickname}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-red-500">
                    <span className="text-sm">🖤</span>
                    <span className="text-sm font-medium">{study.like}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">
            더 많은 스터디를 불러오는 중...
          </span>
        </div>
      )}
    </div>
  );
}
