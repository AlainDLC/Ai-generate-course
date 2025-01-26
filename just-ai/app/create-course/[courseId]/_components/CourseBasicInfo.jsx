"use client";
import { HiOutlinePuzzlePiece } from "react-icons/hi2";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import EditCourseInfo from "./EditCourseInfo";
import Link from "next/link";

export default function CourseBasicInfo({ course, refreshData, edit = true }) {
  const [selectedFile, setSelectedFile] = useState("");
  const onFileSelected = (event) => {
    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file));
    const fileName = Date.now() + ".jpg";
  };

  return (
    <div className="p-10 border rounded-xl shadow-sm mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h2 className="font-bold text-3xl">
            {course?.courseOutput?.["Course Name"]}
            {/*  { edit && <EditCourseInfo
              course={course}
              refreshData={() => refreshData(true)}
            /> }*/}
          </h2>
          <p className="text-sm text-slate-400 mt-3">
            {course?.courseOutput?.["Description"]}
          </p>
          <h2 className="font-medium mt-2 flex gap-2 items-center text-primary">
            <HiOutlinePuzzlePiece /> {course?.category}
          </h2>
          {!edit && (
            <Link href={"/course/" + course?.courseId + "/start"}>
              <Button className="w-full mt-2">Start</Button>
            </Link>
          )}
        </div>
        <div>
          <label htmlFor="upload-image">
            <Image
              src={selectedFile ? selectedFile : "/place1.png"}
              width={300}
              height={300}
              alt="place"
              className="w-full rounded-xl h-[250px] object-fit cursor-pointer"
            />
            {edit && (
              <input
                type="file"
                id="upload-image"
                className="opacity-0"
                onChange={onFileSelected}
              />
            )}
          </label>
        </div>
      </div>
    </div>
  );
}
