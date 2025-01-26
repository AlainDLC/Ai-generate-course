"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useContext, useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { UseCourseListContext } from "@/app/_context/UserCourseListContext";

export default function UserCourseList() {
  const { user } = useUser();

  const [courseList, setCourseList] = useState();

  const { userCourseList, setUserCourseList } =
    useContext(UseCourseListContext);

  useEffect(() => {
    user && getUserCourses();
  }, [user]);

  const getUserCourses = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.createdBy, user?.primaryEmailAddress.emailAddress));
    setCourseList(result);
    setUserCourseList(result);
  };
  return (
    <div className="mt-10">
      <h2 className="font-bold text-xl text-secondary">My Ai Courses</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-10">
        {courseList?.length > 0
          ? courseList?.map((course, index) => (
              <CourseCard course={course} key={index} />
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="w-fill bg-slate-100 animate-pulse rounded-lg h-[200px] mt-5"
              ></div>
            ))}
      </div>
    </div>
  );
}
