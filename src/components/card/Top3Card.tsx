import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Top3Card() {
  const top3 = await prisma.study.findMany({
    orderBy: { like: "desc" },
    take: 3,
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex mb-6">
        <h2 className="text-2xl font-bold text-gray-900">인기많은 스터디</h2>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {top3.map((item) => (
          <Link
            href={`/study/${item.id}`}
            key={item.id}
            className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 line-clamp-1">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {item.content.replace(/[#_*~`>[\]()\-!\n]/g, "").slice(0, 100)}
              </p>
              <div className="flex items-center gap-1 text-red-500">
                <span>❤️</span>
                <span className="text-sm font-medium">{item.like}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
