import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.study.update({
    where: { id: Number(params.id) },
    data: { views: { increment: 1 } },
  });

  return NextResponse.json({ ok: true });
}
