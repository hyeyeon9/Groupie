import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Top3Card() {
  const top3 = await prisma.study.findMany({
    orderBy: { like: "desc" }, // 좋아요 순 오름차순
    take: 3, // 3개만
  });
  return (
    <>
      <h1 className="mb-2 font-bold text-2xl mt-5">스터디 Top3</h1>
      <div className="grid grid-cols-3 gap-2">
        {top3.map((item) => (
          <Link
            href={`/study/${item.id}`}
            key={item.id}
            className="flex flex-col gap-2 border p-4"
          >
            <div>
              <p>{item.title}</p>
              <p>{item.content}</p>
              <p>❤️ {item.like}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
