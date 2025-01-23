import React from "react";
import { HiOutlineChartBar, HiOutlineClock } from "react-icons/hi";
import { HiOutlineBookOpen, HiOutlinePlayCircle } from "react-icons/hi2";

export default function CourseDetails({ course }) {
  return (
    <div className="border p-6 rounded-xl shadow-sm mt-3 gap-5">
      <div className="grid grid-cols-2 md:grid-cols-4">
        <div className="flex gap-2">
          <HiOutlineChartBar className="text-4xl text-primary" />
          <div>
            <h2 className="text-sm text-slate-400">Skill Level</h2>
            <h2 className="font-medium text-lg">{course?.level}</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <HiOutlineClock className="text-4xl text-primary" />
          <div>
            <h2 className="text-sm text-slate-400">Duration</h2>
            <h2 className="font-medium text-lg">
              {course?.courseOutput?.Chapters?.[0]?.Duration}
            </h2>
          </div>
        </div>
        <div className="flex gap-2">
          <HiOutlineBookOpen className="text-4xl text-primary" />
          <div>
            <h2 className="text-sm text-slate-400">Number of Chapters</h2>
            <h2 className="font-medium text-lg">{course?.noOfChapter}</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <HiOutlinePlayCircle className="text-4xl text-primary" />
          <div>
            <h2 className="text-sm text-slate-400">Video Included</h2>
            <h2 className="font-medium text-lg">{course?.includeVideo}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
