import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // params를 await로 받아옵니다
  const params = await context.params;

  await prisma.study.update({
    where: { id: Number(params.id) },
    data: { views: { increment: 1 } },
  });

  return NextResponse.json({ ok: true });
}
