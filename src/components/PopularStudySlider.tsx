"use client";
import { Study } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Slider from "react-slick";

export default function PopularStudySlider({ posts }: { posts: Study[] }) {
  const [isMounted, setIsMounted] = useState(false);
  const [today, setToday] = useState<Date | null>(null);

  const router = useRouter();

  useEffect(() => {
    setToday(() => {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      return d;
    });
    setIsMounted(true);
  }, []);

  if (!isMounted || !today) return null; // SSR 방지

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true, // 자동 슬라이드
    autoplaySpeed: 3000, // 3초 간격
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // 모바일 기준
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // 태블릿
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {posts.map((item) => (
        <div
          key={item.id}
          className=" flex flex-col justify-between h-full px-2"
        >
          <div className="border border-gray-200 rounded p-5 shadow-sm ">
            <div className="space-y-2 ">
              <h3
                onClick={() => router.push(`/study/${item.id}`)}
                className="font-semibold text-gray-900 line-clamp-1 hover:cursor-pointer hover:text-blue-500 transition-colors duration-200"
              >
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 min-h-[48px]">
                {item.content.replace(/[#_*~`>[\]()\-!\n]/g, "").slice(0, 100)}
              </p>
            </div>
            <div className="flex justify-between mt-2">
              <div className="flex gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {item.category}
                </span>
                <p
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    item.startDate && new Date(item.startDate) < today
                      ? "bg-gray-300 text-gray-500"
                      : "bg-green-200 text-green-700"
                  }`}
                >
                  {" "}
                  {item.startDate && new Date(item.startDate) < today
                    ? "모집 마감"
                    : "모집중"}
                </p>
              </div>
              <div className="flex items-center gap-1 text-red-500">
                <span>❤️</span>
                <span className="text-sm font-medium">{item.like}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}
