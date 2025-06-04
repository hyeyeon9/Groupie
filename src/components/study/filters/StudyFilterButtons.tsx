"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = ["전체", "코딩", "어학", "자격증"];
const types = ["전체", "온라인", "오프라인"];

export default function StudyFilterBar() {
  const router = useRouter();
  const pathname = usePathname(); // 현재 위치 URL  "/study"
  const searchParams = useSearchParams(); // ?뒤에 매개변수  "?category=코딩"

  const currentCategory = searchParams.get("category") || "전체";
  const currentType = searchParams.get("studyType") || "전체";
  const currentStatus = searchParams.get("status");

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "전체") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  // 모집중 버튼 토글
  const toggleStatus = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentStatus === "open") {
      params.delete("status");
    } else {
      params.set("status", "open");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-4">
      {/* 카테고리 셀렉트 */}
      <label htmlFor="study-category" className="sr-only">
        스터디 카테고리
      </label>
      <select
        id="study-category"
        value={currentCategory}
        onChange={(e) => updateParam("category", e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 text-sm"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* 온라인/오프라인 셀렉트 */}
      <label htmlFor="study-type" className="sr-only">
        스터디 형식(온라인/오프라인)
      </label>
      <select
        id="study-type"
        value={currentType}
        onChange={(e) => updateParam("studyType", e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 text-sm"
      >
        {types.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      {/* 모집중 필터 버튼 */}
      <button
        onClick={toggleStatus}
        className={`px-4 py-2 rounded text-sm ${
          currentStatus === "open"
            ? "bg-black text-white"
            : "bg-white text-gray-600 border"
        }`}
      >
        모집중만 보기
      </button>
    </div>
  );
}
