import FilterButtons from "@/components/buttons/FilterButtons";
import StudyList from "@/components/lists/StudyList";
import Link from "next/link";

export default function StudyHomePage({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  return (
    <div className="min-h-screen w-full p-10">
      <Link href="/newStudy">스터디 모집</Link>
      <FilterButtons />
      <StudyList category={searchParams?.category} />
    </div>
  );
}
