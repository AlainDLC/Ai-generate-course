"use client";
import { UseCourseListContext } from "@/app/_context/UserCourseListContext";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useContext } from "react";

export default function AddCourse() {
  const { user } = useUser();

  const { userCourseList, setUserCourseList } =
    useContext(UseCourseListContext);

  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl">
          Hello{" "}
          <span className="font-bold text-primary">{user?.fullName} </span>
          <p className="text-sm text-slate-400">
            Create new course with power of AI
          </p>
        </h2>
      </div>

      <Link
        href={userCourseList >= 5 ? "/dashboard/upgrade" : "/create-course"}
      >
        <Button>+ Create Ai Course</Button>
      </Link>
    </div>
  );
}
