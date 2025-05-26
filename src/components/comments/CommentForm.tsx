"use client";
import { createComment } from "@/actions/comments-actions";
import { useActionState } from "react";

export default function CommentForm({ postId }: { postId: number }) {
  const [formState, formAction] = useActionState(createComment, {
    error: null,
  });

  return (
    <form className="space-y-4" action={formAction}>
      <input hidden name="postId" value={postId} readOnly />
      <div>
        <textarea
          name="content"
          placeholder="댓글을 작성하세요."
          rows={3}
          className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-500"
        />
        {formState?.error && (
          <p className="mt-2 text-sm text-red-600">{formState.error}</p>
        )}
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          댓글 작성
        </button>
      </div>
    </form>
  );
}
