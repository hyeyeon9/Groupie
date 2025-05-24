"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // 새로고침 막고
    const params = new URLSearchParams(searchParams.toString());
    if (keyword.trim()) {
      params.set("query", keyword);
    } else {
      params.delete("query");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex border">
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        type="text"
        placeholder="검색어를 입력하세요."
        className="py-2 px-5  rounded w-11/12"
      />
      <button type="submit">🔍</button>
    </form>
  );
}
