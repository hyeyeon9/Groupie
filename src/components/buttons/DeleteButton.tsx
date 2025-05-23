"use client";
import { deleteStudy } from "@/actions/study-actions";
import { useTransition } from "react";

export default function DeleteButton({ postId }: { postId: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(() => {
      deleteStudy(postId);
    });
  };

  return (
    <button onClick={handleDelete} disabled={isPending} className="text-gray-400 ">
      {isPending ? "삭제 중.." : "삭제"}
    </button>
  );
}
