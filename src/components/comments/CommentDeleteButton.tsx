"use client";

import { deleteComment } from "@/actions/comments-actions";
import { useTransition } from "react";

export default function CommentDeleteButton({ commentId }: { commentId: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(() => {
      deleteComment(commentId);
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-gray-400 hover:cursor-pointer"
    >
      {isPending ? "삭제 중.." : "삭제"}
    </button>
  );
}
