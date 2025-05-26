"use client";
import { updateStudy } from "@/actions/study-actions";
import { Study } from "@prisma/client";
import { useActionState, useEffect, useState } from "react";
import PostEditor from "../markdown/MarkdownEditor";

export default function EditForm({ post }: { post: Study }) {
  const [formState, formAction] = useActionState(updateStudy, {
    error: null,
  });
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(post.content);
  }, [post.content]);

  return (
    <>
      <form className="space-y-6" action={formAction}>
        <input type="hidden" name="id" value={post.id} />
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            카테고리
          </label>
          <select
            id="category"
            name="category"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
            defaultValue={post.category}
          >
            <option value="코딩">💻 코딩</option>
            <option value="어학">🌍 어학</option>
            <option value="자격증">📜 자격증</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            제목
          </label>
          <input
            id="title"
            name="title"
            placeholder="제목을 입력하세요."
            defaultValue={post.title}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
          />
        </div>
        {/* 내용 작성 */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <PostEditor
            value={content}
            onChange={(val) => setContent(val || "")}
          />
        </div>

        {/* formData.get("content") 보내기 위해서 아래 코드 추가  */}
        <input type="hidden" name="content" value={content} />

        {/* 에러 메시지 */}
        {formState?.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <svg
                className="w-5 h-5 text-red-400 mr-2 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-red-700">{formState.error}</p>
            </div>
          </div>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            className="hover:cursor-pointer inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            등록하기
          </button>
        </div>
      </form>
    </>
  );
}
