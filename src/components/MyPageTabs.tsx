"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MyPageTabs() {
  const pathname = usePathname();

  return (
    <div className="flex gap-4  mb-4">
      <Link href="/study/mypage" className="flex-1/2 text-center ">
        <button
          className={`px-4 py-2 w-full ${
            pathname === "/study/mypage"
              ? "border-b-2 font-bold"
              : "text-gray-400"
          }`}
        >
          글
        </button>
      </Link>
      <Link href="/study/mypage/likes" className="flex-1/2 text-center">
        <button
          className={`px-4 py-2 w-full ${
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
