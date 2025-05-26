import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function PostEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (val?: string) => void;
}) {
  return (
    <div data-color-mode="light">
      <MDEditor value={value} onChange={onChange} />
    </div>
  );
}
