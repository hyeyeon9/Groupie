"use client"

import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import dynamic from "next/dynamic"

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

export default function PostEditor({
  value,
  onChange,
}: {
  value: string
  onChange: (val?: string) => void
}) {
  return (
    <div data-color-mode="light" className="markdown-editor-wrapper">
      <MDEditor
        value={value}
        onChange={onChange}
        preview="edit"
        textareaProps={{
          placeholder:
            "스터디에 대한 자세한 정보를 작성해주세요...\n\n예시:\n## 📚 스터디 소개\n- 목표: React 기초부터 실전까지\n- 기간: 8주 (주 2회)\n- 인원: 4-6명\n\n## 📅 진행 방식\n- 매주 화, 목 오후 7시\n- 온라인 진행 (Zoom)\n\n## 📞 연락처\n- 카카오톡: @username",
          style: {
            fontSize: 14,
            lineHeight: 1.6,
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
          },
        }}
        height={400}
      />

    </div>
  )
}
