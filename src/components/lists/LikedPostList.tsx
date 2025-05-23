import { prisma } from "@/lib/prisma";
import PostCard from "../PostCard";

export default async function LikedPostList({ userId }: { userId: number }) {
  const likedPosts = await prisma.like.findMany({
    where: { userId },
    include: { study: true },
  });

  if (likedPosts.length === 0) {
    return <p>좋아요한 글이 없습니다.</p>;
  }

  const filteredPosts = likedPosts.filter(
    (like) => like.study.authorId !== userId
  );

  return (
    <div className="space-y-6 flex flex-col gap-2  p-4 ">
      {filteredPosts.map((like) => (
        <PostCard key={like.study.id} post={like.study} />
      ))}
    </div>
  );
}
