"use client";
import { formatRelativeTime } from "@/lib/date";
import { Comment, Study, User } from "@prisma/client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type StudyType = Study & {
  author: User;
  comments: Comment[];
};

export default function StudyList({
  category,
  query,
}: {
  category?: string;
  query?: string;
}) {
  const [studies, setStudies] = useState<StudyType[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchStudies = async (reset = false) => {
    if (loading) return;
    setLoading(true);

    try {
      const params = new URLSearchParams();
      if (cursor && !reset) params.append("cursor", cursor.toString());
      if (category) params.append("category", category);
      if (query) params.append("query", query);

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

  // 초기 로딩 및 카테고리/쿼리 변경 시 리셋
  useEffect(() => {
    setStudies([]);
    setCursor(null);
    setHasMore(true);
    setInitialized(false);
    fetchStudies(true).then(() => setInitialized(true)); // 현재 커서가 null일때 (가장 처음)바로 fetch해야 한다.
  }, [category, query]);

  // 무한스크롤 observer
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
    return <p>로딩 중...</p>;
  }

  if (initialized && studies.length === 0) {
    return <p>등록된 글이 없습니다.</p>;
  }

  return (
    <div className="grid grid-cols-3 mt-10 gap-8">
      {studies.map((study, index) => (
        <Link href={`/study/${study.id}`} key={study.id}>
          <div
            ref={index === studies.length - 1 ? observerRef : null}
            className="flex flex-col gap-2 shadow-sm p-4 rounded-lg"
          >
            <p className="bg-gray-200 text-sm w-fit rounded-full text-center px-3 py-1">
              {study.category}
            </p>
            <p className="text-xl font-bold mt-2">{study.title}</p>
            <p className="line-clamp-2 text-gray-700 mt-1">
              {study.content.replace(/[#_*~`>[\]()\-!\n]/g, "").slice(0, 100)}
            </p>

            <div className="flex gap-2 text-sm font-light mt-2">
              <p>{formatRelativeTime(new Date(study.createdAt))}</p>
              <p>{study.comments.length}개의 댓글</p>
            </div>
            <div className="flex justify-between text-sm mt-2 border-t pt-3">
              <p>
                <span className="text-gray-400 mr-1.5">by</span>
                {study.author.nickname}
              </p>
              <p className="flex gap-2.5">
                <span>🖤 </span>
                {study.like}
              </p>
            </div>
          </div>
        </Link>
      ))}
      {loading && <p className="col-span-3 text-center">로딩 중...</p>}
    </div>
  );
}
