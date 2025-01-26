import React from "react";
import { HiOutlineClock, HiOutlineCheckCircle } from "react-icons/hi";
import EditChapter from "./EditChapter";

// KOlla från 3 : 40
export default function ChapterList({ course }) {
  return (
    <div className="mt-3">
      <h2 className="font-medium text-2xl">Chapters</h2>
      <div className="mt-2">
        {course?.courseOutput?.Chapters?.map((item, index) => (
          <div
            key={index}
            className="border p-5 rounded-lg mb-2 flex items-center justify-between"
          >
            <div className="flex gap-5 items-center">
              <h2 className="bg-primary h-10 w-10 rounded-full text-center p-2 flex-none">
                {index + 1}
              </h2>
              <div>
                <h2 className="font-medium text-lg">
                  {item["Chapter Name"]}
                  {/* <EditChapter course={course} index={index} /> */}
                </h2>
                <p className="text-sm text-slate-400">{item.About}</p>
                <p className="flex gap-2 text-primary items-center">
                  <HiOutlineClock />
                  {item.Duration}
                </p>
              </div>
            </div>
            <HiOutlineCheckCircle className="text-4xl text-slate-300 flex-none" />
          </div>
        ))}
      </div>
    </div>
  );
}
