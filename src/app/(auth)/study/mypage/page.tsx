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
      마이페이지
      <p>{userInfo?.nickname}</p>
    </div>
  );
}
