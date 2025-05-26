"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = ["전체", "코딩", "어학", "자격증"];
export default function FilterButtons() {
  const router = useRouter();
  const pathname = usePathname(); // 현재 위치 URL  "/study"
  const searchParams = useSearchParams(); // ?뒤에 매개변수  "?category=코딩"
  const current = searchParams.get("category") || "전체";

  const handleClick = (category: string) => {
    //searchParams는 읽기 전용이라 .set()이나 .delete()를 쓸 수 없음!
    // 그래서 new URLSearchParams()를 이용해서 수정 가능한 복제본을 만드는 것
    const params = new URLSearchParams(searchParams.toString());
    if (category === "전체") {
      params.delete("category");
    } else {
      params.set("category", category); // category=코딩 으로 세팅
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex  gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          value={cat}
          onClick={() => handleClick(cat)}
          className={`px-3 py-2 text-sm rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:cursor-pointer ${
            current === cat
              ? "bg-black text-white shadow-md focus:ring-black-500"
              : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-500"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
