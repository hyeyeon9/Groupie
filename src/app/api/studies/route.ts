// app/api/studies/route.ts
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const cursorParam = searchParams.get("cursor");
    const cursor = cursorParam ? Number(cursorParam) : null;
    const category = searchParams.get("category");
    const query = searchParams.get("query");
    const take = 6;

    console.log("API params:", { cursor, category, query });

    // where 조건 구성 - TypeScript가 Prisma가 기대하는 필드만 허용
    const where: Prisma.StudyWhereInput = {};

    if (category && category !== "전체" && category !== "null") {
      where.category = category;
    }

    if (query && query !== "null") {
      where.OR = [
        { title: { contains: query } },
        { content: { contains: query } },
      ];
    }

    const studies = await prisma.study.findMany({
      where,
      orderBy: { createdAt: "desc" },
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1, // cursor 제외
      }),
      take,
      include: {
        author: true,
        comments: true,
      },
    });

    const nextCursor =
      studies.length === take ? studies[studies.length - 1].id : null;

    return NextResponse.json({
      posts: studies,
      nextCursor,
      hasMore: !!nextCursor,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch studies" },
      { status: 500 }
    );
  }
}
