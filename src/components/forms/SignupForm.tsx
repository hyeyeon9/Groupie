"use client";
import { FormState, signup } from "@/actions/auth";
import Link from "next/link";
import { useActionState } from "react";

export default function SignupForm() {
  const [formState, formAction] = useActionState<FormState, FormData>(signup, {
    errors: {},
  });
  return (
    <form action={formAction} className="flex flex-col gap-3">
      <div className="flex flex-col">
        <label htmlFor="id" className="font-bold mb-2">
          아이디
        </label>
        <input
          type="text"
          name="id"
          placeholder="아이디를 입력하세요."
          id="id"
          className="border-1 border-gray-300 py-2 px-4 rounded"
        />
      </div>
      {formState?.errors?.id && (
        <p className="text-red-500">{formState.errors.id}</p>
      )}
      <div className="flex flex-col mt-2">
        <label htmlFor="password" className="font-bold mb-2">
          비밀번호
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="비밀번호를 입력하세요."
          className="border-1 border-gray-300 py-2 px-4 rounded"
        />
      </div>
      {formState?.errors?.password && (
        <p className="text-red-500">{formState.errors.password}</p>
      )}
      <div className="flex flex-col mt-2">
        <label htmlFor="nickname" className="font-bold mb-2">
          닉네임
        </label>
        <input
          type="text"
          name="nickname"
          placeholder="닉네임을 입력하세요."
          className="border-1 border-gray-300 py-2 px-4 rounded"
          id="nickname"
        />
      </div>
      {formState?.errors?.nickname && (
        <p className="text-red-500">{formState.errors.nickname}</p>
      )}

      <button
        type="submit"
        className=" bg-blue-500 px-3 py-2 rounded mt-5 hover:cursor-pointer"
      >
        회원가입
      </button>
      <div className="absolute hover:cursor-pointer">
        <p>
          <Link href="/?mode=login">
            <span className="font-bold ">🔙</span>
          </Link>
        </p>
      </div>
    </form>
  );
}
