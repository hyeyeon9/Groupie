import React from "react";
import { formatRelativeTime } from "@/lib/date";
import {  Study, User } from "@prisma/client";

import Image from "next/image";
import { FaBookmark } from "react-icons/fa";
import Link from "next/link";

type StudyType = Study & {
  author: Pick<User, "id" | "nickname" | "profileImage">;
  _count: {
    comments: number;
  };
};

interface Props {
  study: StudyType;
  isLast: boolean;
  observerRef: React.RefObject<HTMLDivElement | null>;
}

const StudyCard = ({ study, isLast, observerRef }: Props) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 오늘 00:00:00

  return (
    <Link href={`/study/${study.id}`} key={study.id}>
      <div
        ref={isLast ? observerRef : null}
        className=" min-h-[200px] group bg-white rounded shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-5">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200">
              {study.category}
            </span>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                study.startDate && new Date(study.startDate) < today
                  ? "bg-gray-300 text-gray-500"
                  : "bg-green-200 text-green-700"
              }`}
            >
              {study.startDate && new Date(study.startDate) < today
                ? "모집 마감"
                : "모집중"}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900  transition-colors line-clamp-1">
              {study.title}
            </h3>
            <p
              className="text-sm text-gray-600 line-clamp-2 leading-relaxed
                  min-h-[48px]"
            >
              {study.content.replace(/[#_*~`>[\]()\-!\n]/g, "").slice(0, 100)}
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>{formatRelativeTime(new Date(study.createdAt))}</span>
            <span>•</span>
            <span>{study._count.comments}개의 댓글</span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div>
                <div className="w-8 h-8 rounded-full overflow-hidden relative">
                  <Image
                    src={study.author.profileImage ?? "/default-avatar.png"}
                    alt="프로필"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <span className="text-sm text-gray-700 font-medium ">
                {study.author.nickname}
              </span>
            </div>
            <div className="flex items-center gap-1 text-red-500">
              <FaBookmark className="text-sm" />

              <span className="text-sm font-medium">{study.scrap}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StudyCard;
