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
      <div className="flex flex-col gap-2 border p-4 rounded">
        <p className="text-2xl font-bold">{post.title}</p>
        <p className="line-clamp-2 text-gray-700">{plainText}</p>
        <p className="bg-gray-200 text-sm w-fit rounded-full text-center px-3 py-1">
          {post.category}
        </p>
        <div className="flex gap-4 text-sm text-gray-400">
          <p>{post.createdAt.toLocaleDateString()}</p>
          <p>🩶 {post.like}</p>
        </div>
      </div>
    </Link>
  );
}
