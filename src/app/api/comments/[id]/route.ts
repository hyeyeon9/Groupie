import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { content } = await req.json();

  const updated = await prisma.comment.update({
    where: { id: Number(id) },
    data: { content },
    include: { author: true },
  });

  return NextResponse.json(updated);
}
