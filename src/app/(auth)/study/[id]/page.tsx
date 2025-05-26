import DeleteButton from "@/components/buttons/PostDeleteButtonDeleteBtn";
import LikeButton from "@/components/buttons/LikeButton";
import CommentList from "@/components/comments/CommentList";
import { verifyAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ViewCounter from "@/components/ViewCounter";
import MarkdownPreview from "@/components/markdown/MarkdownPreview";
import { formatRelativeTime } from "@/lib/date";

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
    <div className="flex flex-col max-w-3xl  mx-auto ">
      <ViewCounter id={post.id} />
      <div className="flex  flex-col w-full min-h-100 mt-10 p-6 shadow-sm bg-white">
        <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
        {post.author.id === user?.id && (
          <div className="flex gap-3 justify-end mb-4">
            <Link href={`/study/${post.id}/edit`}>
              <button className="text-gray-400 hover:cursor-pointer">
                수정
              </button>
            </Link>
            <DeleteButton postId={post.id} />
          </div>
        )}
        <div className="flex justify-between">
          <div className="flex flex-col ">
            <p className="font-bold">{post.author.nickname}</p>
            <div className="flex gap-2 text-gray-500 ">
              <p>{formatRelativeTime(post.createdAt)}</p>
              <p> 조회수 : {post.views}</p>
            </div>
          </div>

          <LikeButton
            studyId={post.id}
            initialLikeCount={post.like}
            initiallyLiked={initiallyLiked}
          />
        </div>
        <p className="bg-gray-200 text-sm w-fit px-3 py-1 mt-4 mb-6 text-teal-500 rounded-full ">
          {post.category}
        </p>

        <div className="prose max-w-none">
          <MarkdownPreview content={post.content} />
        </div>
      </div>
      <div className="mt-10 w-full px-5 lg:p-0">
        <CommentList postId={post.id} />
      </div>
    </div>
  );
}
