import { formatRelativeTime } from "@/lib/date";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function StudyList({
  category,
  query,
}: {
  category?: string;
  query?: string;
}) {
  const studies = await prisma.study.findMany({
    where: { // ...()은 조건이 참이면 객체를 펼쳐 넣겠다는 의미
      ...(category && category !== "전체" && { category }),
      ...(query && {
        OR: [ // 제목이나 본문에 쿼리가 포함되어 있는 경우에 가져옴 (둘중 하나라도)
          // mode: "insensitive"는 대소문자 구분 없이 찾는다는 말씀
          { title: { contains: query } },
          { content: { contains: query } },
        ],
      }),
    },
    orderBy: { createdAt: "desc" },
    include: { author: true, comments: true }, // 내림차순으로 데이터 모두 select
  });

  if (studies.length === 0) {
    return <p>등록된 글이 없습니다. </p>;
  }

  return (
    <div className="grid grid-cols-3 mt-10 gap-8">
      {studies.map((study) => (
        <Link href={`/study/${study.id}`} key={study.id}>
          <div className="flex flex-col g-2 shadow-sm p-4 rounded-lg">
            <p className="bg-gray-200 text-sm w-fit rounded-full text-center px-3 py-1">
              {study.category}
            </p>
            <p className="text-xl font-bold mt-2">{study.title}</p>
            <p className="text-gray-600 mt-1">{study.content}</p>

            <div className="flex gap-2 text-sm font-light mt-2">
              <p>{formatRelativeTime(new Date(study.createdAt))}</p>
              <p>{study.comments.length}개의 댓글</p>
            </div>
            <div className="flex justify-between text-sm mt-2 border-t-1 py-3">
              <p>
                <span className="text-gray-400 mr-1.5">by</span>
                {study.author.nickname}
              </p>
              <p className="flex gap-2.5">
                <span>🖤 </span>
                {study.like}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
