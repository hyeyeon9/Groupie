import DeleteButton from "@/components/DeleteButton";
import LikeButton from "@/components/LikeButton";
import { verifyAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

type StudyDetailPageProps = {
  params: { id: string };
};

export default async function StudyDetailPage({
  params,
}: StudyDetailPageProps) {
  const id = Number(params?.id);
  const post = await prisma.study.findUnique({
    where: { id: id },
    include: {
      author: true,
    },
  });

  if (!post) {
    return <p className="text-center mt-10">존재하지 않는 게시글입니다.</p>;
  }

  const { user } = await verifyAuth();

  let initiallyLiked = false;

  if (user) {
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_studyId: {
          userId: user.id,
          studyId: post.id,
        },
      },
    });

    initiallyLiked = !!existingLike; // !!은 값을 boolean으로 강제 변환하는 표현
  }

  return (
    <div className="flex flex-col max-w-2xl mx-auto min-h-100 mt-10 p-6 border rounded-lg shadow-sm bg-white">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      {post.author.id === user?.id && (
        <div className="flex gap-3 justify-end mb-4">
          <Link href={`/study/${post.id}/edit`}>
            <button className="text-gray-400 ">수정</button>
          </Link>
          <DeleteButton postId={post.id} />
        </div>
      )}
      <div className="flex justify-between">
        <p>{post.author.nickname}</p>

        <LikeButton
          studyId={post.id}
          initialLikeCount={post.like}
          initiallyLiked={initiallyLiked}
        />
      </div>
      <p className="bg-gray-200 text-sm w-fit px-3 py-1  text-teal-500 rounded-full mb-2">
        {post.category}
      </p>

      <p className="text-gray-700 whitespace-pre-line mt-4">{post.content}</p>
    </div>
  );
}
