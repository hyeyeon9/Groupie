import { prisma } from "@/lib/prisma";
import PostCard from "../PostCard";

export default async function StudyListForMyPage({
  userId,
}: {
  userId: number;
}) {
  const posts = await prisma.study.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: "desc" },
  });

  if (posts.length === 0) {
    return <p>작성한 글이 없습니다.</p>;
  }

  return (
    <div className="space-y-6 flex flex-col gap-2  p-4 ">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
