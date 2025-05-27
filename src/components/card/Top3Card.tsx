import { prisma } from "@/lib/prisma";
import PopularStudySlider from "../PopularStudySlider";

export default async function Top3Card() {
  const top3 = await prisma.study.findMany({
    orderBy: { like: "desc" },
    take: 10,
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0); // 오늘 00:00:00

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex mb-6">
        <h2 className="text-2xl font-bold text-gray-900">🔥 인기많은 스터디</h2>
      </div>
      <div>
        <PopularStudySlider posts={top3} />
      </div>
      {/* <div className="hidden lg:grid grid-cols-3 gap-4">
        {top3.map((item) => (
          <Link
            href={`/study/${item.id}`}
            key={item.id}
            className="group relative border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col justify-between h-full">
              <div className="space-y-2 ">
                <h3 className="font-semibold text-gray-900 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {item.content
                    .replace(/[#_*~`>[\]()\-!\n]/g, "")
                    .slice(0, 100)}
                </p>
              </div>
              <div className="flex justify-between mt-2">
                <div className="flex gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {item.category}
                  </span>
                  <p
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      item.startDate && new Date(item.startDate) < today
                        ? "bg-gray-300 text-gray-500"
                        : "bg-green-200 text-green-700"
                    }`}
                  >
                    {" "}
                    {item.startDate && new Date(item.startDate) < today
                      ? "모집 마감"
                      : "모집중"}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-red-500">
                  <span>❤️</span>
                  <span className="text-sm font-medium">{item.like}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div> */}
    </div>
  );
}
