import FilterButtons from "@/components/buttons/FilterButtons";
import StudyList from "@/components/lists/StudyList";
import SearchBar from "@/components/SearchBar";
import Top3Card from "@/components/card/Top3Card";
import Link from "next/link";

export default function StudyHomePage({
  searchParams,
}: {
  searchParams?: { category?: string; query?: string };
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* 검색 및 스터디 모집 섹션 */}
        <div>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 w-full sm:max-w-md ">
              <SearchBar />
            </div>
            <Link
              href="/newStudy"
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white
               bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap"
            >
              + 스터디 모집
            </Link>
          </div>
          <div className="mt-6">
            <FilterButtons />
          </div>
        </div>

        {/* Top3 카드 섹션 */}
        <Top3Card />

        {/* 스터디 목록 섹션 */}
        <StudyList
          category={searchParams?.category}
          query={searchParams?.query}
        />
      </div>
    </div>
  );
}
