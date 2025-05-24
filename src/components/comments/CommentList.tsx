import { prisma } from "@/lib/prisma";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

export default async function CommentList({ postId }: { postId: number }) {
  const comments = await prisma.comment.findMany({
    where: { studyId: postId },
    include: { author: true },
  });

  const len = comments.length;

  return (
    <div className="p-5">
      <div className="text-xl font-light mb-4">{len}개의 댓글</div>
      <CommentForm postId={postId} />
      <div className="mt-5 flex flex-col">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
