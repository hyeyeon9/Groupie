"use client";
import { createStudy } from "@/actions/study-actions";
import { useActionState, useState } from "react";
import PostEditor from "../markdown/MarkdownEditor";

export default function StudyForm() {
  const [formState, formAction] = useActionState(createStudy, {
    error: null,
  });

  const [content, setContent] = useState("");

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
      <PostEditor value={content} onChange={(val) => setContent(val || "")} />
      {/* formData.get("content") 보내기 위해서 아래 코드 추가  */}
      <input type="hidden" name="content" value={content} />
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
