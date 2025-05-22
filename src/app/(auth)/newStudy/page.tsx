import StudyForm from "@/components/StudyForm";

export default function NewStudy() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">스터디 모집 페이지</h1>
        <StudyForm />
      </div>
    </div>
  );
}
