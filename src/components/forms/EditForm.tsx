"use client";
import { updateStudy } from "@/actions/study-actions";
import { Study } from "@prisma/client";
import { useActionState, useEffect, useState } from "react";
import PostEditor from "../markdown/MarkdownEditor";

export default function EditForm({ post }: { post: Study }) {
  const [formState, formAction] = useActionState(updateStudy, {
    error: null,
  });
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(post.content);
  }, [post.content]);

  return (
    <>
      <form className="flex flex-col gap-4" action={formAction}>
        <input type="hidden" name="id" value={post.id} />

        <input
          name="title"
          placeholder="제목을 입력하세요."
          defaultValue={post.title}
          type="text"
          className="border p-2"
        />
        <select
          name="category"
          className="border p-2"
          defaultValue={post.category}
        >
          <option>코딩</option>
          <option>어학</option>
          <option>자격증</option>
        </select>

        <PostEditor value={content} onChange={(val) => setContent(val || "")} />
        {/* formData.get("content") 보내기 위해서 아래 코드 추가  */}
        <input type="hidden" name="content" value={content} />
        {formState?.error && <p className="text-red-500">{formState.error}</p>}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 w-20 p-2 rounded text-white hover:cursor-pointer"
          >
            등록하기
          </button>
        </div>
      </form>
    </>
  );
}
