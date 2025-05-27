import StudyListForMyPage from "@/components/lists/StudyListForMyPage"
import MyPageTabs from "@/components/MyPageTabs"
import { verifyAuth } from "@/lib/auth"

export default async function MyPage() {
  const { user } = await verifyAuth()

  if (!user) {
    return (
      <div className="min-h-screen max-w-3xl mx-auto p-10">
        <div className="text-center py-12">
          <p className="text-red-500">유저가 없습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">마이페이지</h1>
        <p className="text-gray-600">내가 작성한 글과 좋아요한 글을 관리하세요</p>
      </div>

      <MyPageTabs />
      <StudyListForMyPage userId={user.id} />
    </div>
  )
}
