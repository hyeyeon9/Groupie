"use client";

import type { Study, User } from "@prisma/client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import StudyCard from "../ui/card/StudyCard";
import StudyCardSkeleton from "./StudyCardSkeleton";
import { useStudyFilters } from "@/hooks/useStudyFilters";
import { useStudyFilterStore } from "@/store/studyFilterStore";

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
  const [isOptimisticLoading, setIsOptimisticLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // URL 파라미터 동기화
  const { category, studyType, status, query } = useStudyFilters();

  // 새로고침 트리거 구독
  const refreshTrigger = useStudyFilterStore((state) => state.refreshTrigger);

  // 스켈레톤 배열 메모이제이션
  const skeletonArray = useMemo(() => Array.from({ length: 3 }), []);

  // 스터디 카드 렌더링 함수를 useCallback으로 메모이제이션
  const renderStudyCard = useCallback(
    (study: StudyType, index: number) => (
      <StudyCard
        key={study.id}
        study={study}
        isLast={index === studies.length - 1}
        observerRef={observerRef}
      />
    ),
    [studies.length, observerRef]
  );

  // 스켈레톤 렌더링 함수를 useCallback으로 메모이제이션
  const renderSkeleton = useCallback(
    (_: unknown, index: number) => <StudyCardSkeleton key={index} />,
    []
  );

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

      if (reset) {
        setStudies(data.posts);
      } else {
        setStudies((prev) => [...prev, ...data.posts]);
      }

      setCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } finally {
      setLoading(false);
      setIsOptimisticLoading(false);
    }
  };

  // 필터 변경을 감지하는 함수
  const triggerOptimisticUpdate = useCallback(() => {
    setIsOptimisticLoading(true);
    setStudies([]);
    setCursor(null);
    setHasMore(true);
    setInitialized(false);
  }, []);

  // 새로고침 트리거 감지
  useEffect(() => {
    if (refreshTrigger > 0) {
      triggerOptimisticUpdate();
    }
  }, [refreshTrigger, triggerOptimisticUpdate]);


  // URL 파라미터 변경 감지
  useEffect(() => {
    // 이미 낙관적 업데이트가 진행중이면 스킵
    if (isOptimisticLoading) {
      fetchStudies(true).then(() => setInitialized(true));
      return;
    }

    // 일반적인 URL 변경 처리
    setStudies([]);
    setCursor(null);
    setHasMore(true);
    setLoading(true);
    setInitialized(false);

    fetchStudies(true).then(() => setInitialized(true));
  }, [category, query, studyType, status]);

  // 무한 스크롤 처리
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

  // 로딩 중이거나 데이터가 없을 때 스켈레톤 표시
  const shouldShowSkeleton =
    (loading || isOptimisticLoading) && studies.length === 0;

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
        {shouldShowSkeleton
          ? skeletonArray.map(renderSkeleton)
          : studies.map(renderStudyCard)}
      </div>

      {/* 데이터 다 로드 후, 아무 것도 없을 때 */}
      {initialized &&
        studies.length === 0 &&
        !loading &&
        !isOptimisticLoading && (
          <div className="text-center py-12 col-span-3 w-full">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <p className="text-gray-500 text-lg">등록된 글이 없습니다.</p>
          </div>
        )}
    </div>
  );
}
