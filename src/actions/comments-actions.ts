"use server";

import { verifyAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type FormState = {
  error?: string | null;
};

export async function createComment(prevState: FormState, formData: FormData) {
  const { user } = await verifyAuth();

  if (!user) {
    return {
      error: "로그인이 필요한 작업입니다.",
    };
  }

  const postId = formData.get("postId") as string;
  const content = formData.get("content") as string;

  if (!postId || !content) {
    return {
      error: "댓글을 작성해주세요.",
    };
  }

  await prisma.comment.create({
    data: {
      content,
      studyId: Number(postId),
      authorId: user.id,
    },
  });

  redirect(`/study/${postId}`);
  return { error: null };
}

export async function deleteComment(commentId: number) {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    include: {
      study: true,
    },
  });

  if (!comment) {
    return {
      error: "삭제할 댓글이 없습니다.",
    };
  }

  await prisma.comment.delete({ where: { id: commentId } });
  redirect(`/study/${comment.studyId}`);
}

export async function updateComment(
  commentId: number,
  editedContent: string,
  studyId: number
) {
  const { user } = await verifyAuth(); // 로그인 사용자 가져오기
  console.log(user);

  if (!user) {
    return { error: "로그인이 필요합니다." };
  }

  if (!commentId || !editedContent) {
    return {
      error: "수정 불가",
    };
  }

  await prisma.comment.update({
    where: { id: commentId },
    data: {
      content: editedContent,
    },
  });

  redirect(`/study/${studyId}`);
}
