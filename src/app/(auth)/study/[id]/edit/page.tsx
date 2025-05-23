import EditForm from "@/components/forms/EditForm";
import { prisma } from "@/lib/prisma";
import React from "react";

export default async function EditPage({ params }: { params: { id: string } }) {
  const post = await prisma.study.findUnique({
    where: { id: Number(params?.id) },
  });

  if (!post) {
    return <p className="text-center mt-10">존재하지 않는 게시글입니다.</p>;
  }

  return <EditForm post={post} />;
}
