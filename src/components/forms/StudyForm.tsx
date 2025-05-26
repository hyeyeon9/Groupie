"use client";
import { createStudy } from "@/actions/study-actions";
import { useActionState, useState } from "react";
import PostEditor from "../markdown/MarkdownEditor";

export default function StudyForm() {
  const [formState, formAction] = useActionState(createStudy, {
    error: null,
  });

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("코딩");

  return (
    <form className="space-y-6" action={formAction}>
      {/* 카테고리 선택 */}
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
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
        >
          <option value="코딩">💻 코딩</option>
          <option value="어학">🌍 어학</option>
          <option value="자격증">📜 자격증</option>
        </select>
      </div>

      {/* 제목 입력 */}
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
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="스터디 제목을 입력하세요. (예: 함께 React 공부하실 분 모집합니다!)"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
        />
      </div>

      {/* 내용 작성 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          스터디 소개
        </label>
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <PostEditor
            value={content}
            onChange={(val) => setContent(val || "")}
          />
        </div>
      </div>

      {/* Hidden input for content */}
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

      {/* 제출 버튼 */}
      <div className="flex items-center justify-end pt-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setTitle("");
              setContent("");
              setCategory("코딩");
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            초기화
          </button>
          <button
            type="submit"
            disabled={!title.trim() || !content.trim()}
            className="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            스터디 등록하기
          </button>
        </div>
      </div>
    </form>
  );
}
