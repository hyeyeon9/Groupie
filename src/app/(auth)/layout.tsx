import { logout } from "@/actions/auth";
import Link from "next/link";
import React from "react";

export default function AuthRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="flex items-center justify-between px-6 py-10 ">
        <div className="flex-1 text-center">
          <Link href="/study">
            {" "}
            <p className="text-2xl font-bold">Groupie</p>
          </Link>
        </div>
        <div className="flex-1">
          <Link href="/study/mypage">
            {" "}
            <p>마이페이지</p>
          </Link>
        </div>
        <form action={logout} className="absolute right-6">
          <button className="px-4 py-2 bg-red-500 text-white rounded">
            로그아웃
          </button>
        </form>
      </header>
      {children}
    </>
  );
}
