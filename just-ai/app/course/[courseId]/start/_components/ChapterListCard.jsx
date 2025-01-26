import { HiOutlineClock } from "react-icons/hi2";
import React from "react";

export default function ChapterListCard({ chapter, index }) {
  return (
    <div className="grid grid-cols-5 p-3 items-center border-b">
      <div>
        <h2 className="p-1 bg-primary text-white rounded-full w-8 h-8 text-center">
          {index + 1}
        </h2>
      </div>
      <div className="col-span-4 ">
        <h2 className="font-medium">{chapter["Chapter Name"]}</h2>
        <h2 className="flex items-center gap-2 text-primary">
          <HiOutlineClock />
          {chapter?.Duration}
        </h2>
      </div>
    </div>
  );
}
