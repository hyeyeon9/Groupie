"use client";
import { updateStudy } from "@/actions/study-actions";
import { Study } from "@prisma/client";
import { useActionState } from "react";

export default function EditForm({ post }: { post: Study }) {
  const [formState, formAction] = useActionState(updateStudy, {
    error: null,
  });
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

        <textarea
          rows={5}
          name="content"
          className="border p-2"
          defaultValue={post.content}
        />
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
    </>
  );
}
