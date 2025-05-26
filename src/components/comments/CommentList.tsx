import { prisma } from "@/lib/prisma";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { verifyAuth } from "@/lib/auth";

export default async function CommentList({ postId }: { postId: number }) {
  const comments = await prisma.comment.findMany({
    where: { studyId: postId },
    include: { author: true },
  });

  const len = comments.length; // 댓글 개수

  // 로그인 정보 불러오기
  const { user } = await verifyAuth();

  return (
    <div className="bg-white overflow-hidden">
      {/* 댓글 헤더 */}
      <div className="px-6 py-2 ">
        <h3 className="text-lg font-semibold text-gray-900">댓글 {len}개</h3>
      </div>

      {/* 댓글 작성 폼 */}
      <div className="px-6 py-6 border-b border-gray-200">
        <CommentForm postId={postId} />
      </div>

      {/* 댓글 목록 */}
      <div className="px-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              currentUserId={user?.id}
              comment={comment}
            />
          ))
        ) : (
          <div className="py-12 text-center">
            <div className="text-gray-400 text-4xl mb-3">💬</div>
            <p className="text-gray-500">첫 번째 댓글을 작성해보세요!</p>
          </div>
        )}
      </div>
    </div>
  );
}
