import { prisma } from "@/lib/prisma";
import PopularStudySlider from "../PopularStudySlider";

export default async function Top3Card() {
  const top3 = await prisma.study.findMany({
    orderBy: [{ scrap: "desc" }, { views: "desc" }], // 1순위 스크랩, 2순위 조회수
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
    </div>
  );
}
