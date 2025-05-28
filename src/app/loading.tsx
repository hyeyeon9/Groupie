// app/loading.tsx
"use client";

import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-50 h-50 rounded overflow-hidden">
        <Image
          src="/Groupie.png" // public 폴더에 있는 이미지
          alt="로딩 중..."
          fill
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
}
