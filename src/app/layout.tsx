import { logout } from "@/actions/auth";
import { verifyAuth } from "@/lib/auth";
import Link from "next/link";
import type React from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import HeaderAuthButtons from "@/components/buttons/HeaderAuthButtons";
import LoginSignupModal from "@/components/LoginSignupModal";

export default async function AuthRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await verifyAuth();
  return (
    <html lang="ko">
      <body>
        <Toaster position="top-center" reverseOrder={false} />
        <LoginSignupModal />
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0">
                <Link href="/study" className="flex items-center">
                  <h1 className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                    Groupie
                  </h1>
                </Link>
              </div>
              {/* 로그인 상태에 따른 버튼 */}
              <div className="flex items-center space-x-4">
                {user ? (
                  <>
                    <Link
                      href="/study/mypage"
                      className="text-sm lg:text-base text-gray-700 hover:text-gray-900 font-medium transition-colors"
                    >
                      마이페이지
                    </Link>
                    <form action={logout}>
                      <button className="inline-flex items-center px-3 py-1.5 lg:px-4 lg:py-2 text-sm lg:text-base font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                        로그아웃
                      </button>
                    </form>
                  </>
                ) : (
                  <HeaderAuthButtons />
                )}
              </div>
            </div>
          </div>
        </header>
        <main className="min-h-screen ">{children}</main>
      </body>
    </html>
  );
}
