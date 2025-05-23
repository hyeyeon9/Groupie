import LikedPostList from "@/components/lists/LikedPostList";
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
    <div className="min-h-screen w-full p-10">
      <h1>마이페이지</h1>
      <p>{userInfo?.nickname}</p>
      <MyPageTabs />
      <LikedPostList userId={user.id}/>
    </div>
  );
}
