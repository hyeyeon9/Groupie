"use client";
import { createComment } from "@/actions/comments-actions";
import { useActionState } from "react";

export default function CommentForm({ postId }: { postId: number }) {
  const [formState, formAction] = useActionState(createComment, {
    error: null,
  });

  return (
    <form className="flex flex-col gap-4 " action={formAction}>
      <input hidden name="postId" value={postId} readOnly />
      <textarea
        name="content"
        placeholder="댓글을 작성하세요."
        rows={4}
        className="p-5 border"
      />
      {formState?.error && <p className="text-red-500">{formState.error}</p>}
      <div className="flex justify-end">
        <button className="px-3 py-2 rounded bg-blue-500 text-white font-semibold">
          댓글 작성
        </button>
      </div>
    </form>
  );
}
