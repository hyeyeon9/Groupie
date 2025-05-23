"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MyPageTabs() {
  const pathname = usePathname();

  return (
    <div className="flex gap-4 border-b mb-4">
      <Link href="/study/mypage">
        <button
          className={`px-4 py-2 ${
            pathname === "/study/mypage"
              ? "border-b-2 font-bold"
              : "text-gray-400"
          }`}
        >
          글
        </button>
      </Link>
      <Link href="/study/mypage/likes">
        <button
          className={`px-4 py-2 ${
            pathname === "/study/mypage/likes"
              ? "border-b-2 font-bold"
              : "text-gray-400"
          }`}
        >
          좋아요한 글
        </button>
      </Link>
    </div>
  );
}
