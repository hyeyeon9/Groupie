"use client";
import { toggleLike } from "@/actions/study-actions";
import { useModalStore } from "@/store/modalStore";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { FaBookmark } from "react-icons/fa";

export default function ScrapButton({
  studyId,
  initialScrapCount,
  initiallyScraped,
  isLoggedIn,
}: {
  studyId: number;
  initialScrapCount: number;
  initiallyScraped: boolean;
  isLoggedIn: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [liked, setLiked] = useState(initiallyScraped ?? false);
  const [scrapCount, setScrapCount] = useState(initialScrapCount);
  const { open } = useModalStore(); // 모달 열기

  const handleClick = () => {
    if (!isLoggedIn) {
      open("login");
      return;
    }
    startTransition(async () => {
      const res = await toggleLike(studyId);
      setLiked(!!res.liked);
      if (liked) {
        toast.success("스크랩 제거!");
      } else {
        toast.success("스크랩 완료!");
      }
      setScrapCount((prev) => prev + (res.liked ? 1 : -1));
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
      <span>
        {" "}
        <FaBookmark />
      </span>
      <span>{scrapCount}</span>
    </button>
  );
}
