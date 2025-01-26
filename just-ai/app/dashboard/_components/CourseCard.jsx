"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IoBookOutline } from "react-icons/io5";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import DropDownOption from "./DropDownOption";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { Toast } from "@/components/ui/toast";
import Link from "next/link";

export default function CourseCard({ course, displayUser = false }) {
  const [refresh, setRefresh] = useState(0);

  const handleOnDelete = async () => {
    const resp = await db
      .delete(CourseList)
      .where(eq(CourseList.id, course?.id));
  };

  return (
    <div className="p-2 shadow-md flex  flex-col border transition-all cursor-pointer ">
      <Link href={"/course/" + course?.courseId}>
        <Image
          src={"/agusta.jpg"}
          height={300}
          width={200}
          alt="kaw"
          className="w-full h-full object-cover rounded-lg"
        />
      </Link>
      <div>
        <h2 className="font-medium text-lg mt-2 text-start flex justify-between items-center">
          {course?.courseOutput?.["Course Name"]}
          <DropDownOption handleOnDelete={() => handleOnDelete()}>
            <HiMiniEllipsisVertical />
          </DropDownOption>
        </h2>

        <p className="text-sm text-slate-400">{course?.category}</p>
      </div>
      <div className="flex gap-2 items-center p-1 bg-purple-50 text-primary text-sm">
        <IoBookOutline />
        <h2>Chapters: {course?.noOfChapter}</h2>
        <h2>Level: {course?.level}</h2>
      </div>
      <div className="flex gap-2 items-center mt-2 ">
        <Image
          src={course?.userProfilImage}
          alt="user"
          width={30}
          height={30}
          className="rounded-full"
        />
        <h2 className="text-sm text-secondary">{course?.userName}</h2>
      </div>
    </div>
  );
}
