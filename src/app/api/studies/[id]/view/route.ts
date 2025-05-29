import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await prisma.study.update({
    where: { id: Number(context.params.id) },
    data: { views: { increment: 1 } },
  });

  return NextResponse.json({ ok: true });
}
