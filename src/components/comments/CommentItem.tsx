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

export default function CommentItem({ comment }: Props) {
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
    <>
      <div className="border-b-1 py-7">
        <div className="flex justify-between">
          <div className="flex flex-col g-2 mb-5">
            <p className="font-semibold">{comment.author.nickname}</p>
            <p className="text-gray-600">
              {formatRelativeTime(new Date(comment.createdAt))}
            </p>
          </div>
          <div className="flex gap-3 text-gray-400">
            {!isEditing && (
              <button onClick={() => setIsEditing(true)}>수정</button>
            )}
            <CommentDeleteBtn commentId={comment.id} />
          </div>
        </div>
        {isEditing ? (
          <div className="flex flex-col">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full border rounded p-2 mb-2"
            />
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditedContent(comment.content);
                }}
              >
                취소
              </button>

              <button onClick={handleUpdate} disabled={isPending}>
                {isPending ? "수정 중..." : "수정"}
              </button>
            </div>
          </div>
        ) : (
          <div>{comment.content}</div>
        )}
      </div>
    </>
  );
}
