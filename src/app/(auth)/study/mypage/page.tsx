import StudyListForMyPage from "@/components/lists/StudyListForMyPage";
import MyPageTabs from "@/components/MyPageTabs";
import { verifyAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function MyPage() {
  const { user } = await verifyAuth();
  console.log(user);

  if (!user) {
    return {
      error: "유저가 없습니다.",
    };
  }

  const userInfo = await prisma.user.findUnique({
    where: { id: user.id },
  });

  return (
    <div className="min-h-screen  max-w-3xl  mx-auto p-10">
      <p className="font-bold">{userInfo?.nickname}</p>
      <MyPageTabs />
      <StudyListForMyPage userId={user.id} />
    </div>
  );
}
