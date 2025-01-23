import { HiOutlinePuzzlePiece } from "react-icons/hi2";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";

export default function CourseBasicInfo({ course }) {
  console.log(course);

  return (
    <div className="p-10 border rounded-xl shadow-sm mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h2 className="font-bold text-3xl">
            {course?.courseOutput?.["Course Name"]}
          </h2>
          <p className="text-sm text-slate-400 mt-3">
            {course?.courseOutput?.["Description"]}
          </p>
          <h2 className="font-medium mt-2 flex gap-2 items-center text-primary">
            <HiOutlinePuzzlePiece /> {course?.category}
          </h2>
          <Button className="w-full mt-2">Start</Button>
        </div>
        <div>
          <Image
            src={"/place1.png"}
            width={300}
            height={300}
            alt="place"
            className="w-full rounded-xl h-[250px] object-fit"
          />
        </div>
      </div>
    </div>
  );
}
