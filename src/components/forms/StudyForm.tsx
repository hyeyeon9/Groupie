"use client";
import { createStudy } from "@/actions/study-actions";
import { useActionState } from "react";

export default function StudyForm() {
  const [formState, formAction] = useActionState(createStudy, {
    error: null,
  });
  return (
    <form className="flex flex-col gap-4" action={formAction}>
      <select name="category" className="border p-2">
        <option>코딩</option>
        <option>어학</option>
        <option>자격증</option>
      </select>
      <input
        name="title"
        placeholder="제목을 입력하세요."
        type="text"
        className="border p-2"
      />
      <textarea rows={5} name="content" className="border p-2" />
      {formState?.error && <p className="text-red-500">{formState.error}</p>}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 w-20 p-2 rounded-2xl text-white "
        >
          등록하기
        </button>
      </div>
    </form>
  );
}
