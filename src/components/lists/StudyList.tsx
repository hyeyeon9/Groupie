import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function StudyList() {
  const studies = await prisma.study.findMany({
    orderBy: { createdAt: "desc" }, // 내림차순으로 데이터 모두 select
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
          </div>
        </Link>
      ))}
    </div>
  );
}
