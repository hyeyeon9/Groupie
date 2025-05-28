import FilterButtons from "@/components/buttons/FilterButtons";
import StudyList from "@/components/lists/StudyList";
import SearchBar from "@/components/SearchBar";
import { Suspense } from "react";
import StudyAddButton from "@/components/buttons/StudyAddButton";
import { verifyAuth } from "@/lib/auth";
import Top3Card from "@/components/card/Top3Card";

export default async function StudyHomePage() {
  const { user } = await verifyAuth();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Top3 카드 섹션 */}
        <Suspense fallback={<p>🔥 인기 스터디 로딩중...</p>}>
          <Top3Card />
        </Suspense>
        {/* 검색 및 스터디 모집 섹션 */}
        <div>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 w-full sm:max-w-md ">
              <SearchBar />
            </div>
            <StudyAddButton isLoggedIn={!!user?.id} />
          </div>
          <div className="mt-6">
            <FilterButtons />
          </div>
        </div>

        {/* 스터디 목록 섹션 */}
        <StudyList />
      </div>
    </div>
  );
}
