import FilterButtons from "@/components/buttons/FilterButtons";
import StudyList from "@/components/lists/StudyList";
import SearchBar from "@/components/SearchBar";
import Top3Card from "@/components/Top3Card";
import Link from "next/link";

export default function StudyHomePage({
  searchParams,
}: {
  searchParams?: { category?: string; query?: string };
}) {
  return (
    <div className="min-h-screen w-full p-10">
      <SearchBar />
      <Link href="/newStudy">스터디 모집</Link>
      <FilterButtons />
      <Top3Card />
      <StudyList
        category={searchParams?.category}
        query={searchParams?.query}
      />
    </div>
  );
}
