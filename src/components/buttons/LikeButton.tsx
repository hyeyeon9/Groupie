"use client";
import { toggleLike } from "@/actions/study-actions";
import { useState, useTransition } from "react";

export default function LikeButton({
  studyId,
  initialLikeCount,
  initiallyLiked,
}: {
  studyId: number;
  initialLikeCount: number;
  initiallyLiked: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [liked, setLiked] = useState(initiallyLiked ?? false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const handleClick = () => {
    startTransition(async () => {
      const res = await toggleLike(studyId);
      setLiked(!!res.liked);
      setLikeCount((prev) => prev + (res.liked ? 1 : -1));
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`flex items-center gap-1 px-3 py-1 rounded-full hover:cursor-pointer ${
        liked ? "text-red-500" : "text-gray-400"
      }`}
    >
      <span>❤️</span>
      <span>{likeCount}</span>
    </button>
  );
}
