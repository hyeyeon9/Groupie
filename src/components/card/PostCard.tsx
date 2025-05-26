import Link from "next/link";

type Props = {
  post: {
    id: number;
    title: string;
    content: string;
    category: string;
    like: number;
    createdAt: Date;
    authorId?: number;
  };
};

export default function PostCard({ post }: Props) {
  const plainText = post.content
    .replace(/[#_*~`>[\]()\-!\n]/g, "")
    .slice(0, 100);
  return (
    <Link href={`/study/${post.id}`} key={post.id}>
      <div className="flex flex-col gap-2  p-4 border-b-1 pb-12">
        <p className="text-xl font-bold mb-4">{post.title}</p>
        <p className="line-clamp-2 text-gray-500 mb-4">{plainText}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <p className="bg-gray-200 text-xs w-fit rounded-full text-center px-3 py-1">
            {post.category}
          </p>
          <p>{post.createdAt.toLocaleDateString()}</p>
          <p>🩶 {post.like}</p>
        </div>
      </div>
    </Link>
  );
}
