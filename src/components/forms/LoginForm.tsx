"use client";
import { type FormState, login } from "@/actions/auth";
import Link from "next/link";
import { useActionState } from "react";
import { User, Lock, LogIn } from "lucide-react";

export default function LoginForm() {
  const [formState, formAction] = useActionState<FormState, FormData>(login, {
    errors: {},
  });

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">로그인</h1>
          <p className="text-gray-600">계정에 로그인하여 스터디를 시작하세요</p>
        </div>

        {/* 폼 */}
        <form action={formAction} className="space-y-6">
          {/* 아이디 입력 */}
          <div className="space-y-2">
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-700"
            >
              아이디
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="id"
                id="id"
                placeholder="아이디를 입력하세요"
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  formState?.errors?.id
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300"
                }`}
              />
            </div>
            {formState?.errors?.id && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <span className="w-4 h-4">⚠️</span>
                {formState.errors.id}
              </p>
            )}
          </div>

          {/* 비밀번호 입력 */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="비밀번호를 입력하세요"
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  formState?.errors?.password
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300"
                }`}
              />
            </div>
            {formState?.errors?.password && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <span className="w-4 h-4">⚠️</span>
                {formState.errors.password}
              </p>
            )}
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogIn className="w-4 h-4" />
            로그인
          </button>
        </form>

        {/* 회원가입 링크 */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            계정이 없으신가요?{" "}
            <Link
              href="/?mode=signup"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
