"use client";
import { User } from "@prisma/client";
import CommentDeleteBtn from "../buttons/CommentDeleteBtn";
import { useState, useTransition } from "react";
import { updateComment } from "@/actions/comments-actions";
import { formatRelativeTime } from "@/lib/date";

type Props = {
  comment: {
    id: number;
    content: string;
    createdAt: Date;
    studyId: number;
    authorId: number;
    author: User;
  };
};

export default function CommentItem({
  comment,
  currentUserId,
}: Props & {
  currentUserId?: number;
}) {
  const isMyComment = currentUserId === comment.authorId;
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isPending, startTransition] = useTransition();

  const handleUpdate = () => {
    startTransition(async () => {
      await updateComment(comment.id, editedContent, comment.studyId);
      setIsEditing(false);
    });
  };

  return (
    <div className="py-6 border-b border-gray-200 last:border-b-0">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xs text-gray-600">👤</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              {comment.author.nickname}
            </p>
            <p className="text-sm text-gray-500">
              {formatRelativeTime(new Date(comment.createdAt))}
            </p>
          </div>
        </div>

        {isMyComment && (
          <div className="flex items-center gap-2">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:cursor-pointer"
              >
                수정
              </button>
            )}
            <CommentDeleteBtn commentId={comment.id} />
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedContent(comment.content);
              }}
              className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              취소
            </button>
            <button
              onClick={handleUpdate}
              disabled={isPending}
              className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-lg transition-colors duration-200"
            >
              {isPending ? "수정 중..." : "수정"}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {comment.content}
        </div>
      )}
    </div>
  );
}
