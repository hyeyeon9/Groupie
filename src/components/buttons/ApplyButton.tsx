"use client";
import { Study } from "@prisma/client";
import toast from "react-hot-toast";

export default function ApplyButton({ post }: { post: Study }) {
  const handleApply = () => {
    if (post.contactMethod === "이메일") {
      navigator.clipboard.writeText(post.contactLink ?? "null");
      toast.success("클립보드에 이메일을 복사했어요!");
    } else {
      window.open(post.contactLink ?? "", "_blank");
      toast.success("링크로 이동했어요!");
    }
  };
  return (
    <div className="flex justify-end">
      <button
        className="hover:cursor-pointer bg-teal-200 w-fit py-2 px-3 rounded"
        onClick={handleApply}
      >
        지원하기
      </button>
    </div>
  );
}
