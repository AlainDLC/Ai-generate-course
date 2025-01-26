"use client";
import ChapterList from "@/app/create-course/[courseId]/_components/ChapterList";
import CourseBasicInfo from "@/app/create-course/[courseId]/_components/CourseBasicInfo";
import CourseDetails from "@/app/create-course/[courseId]/_components/CourseDetails";
import Header from "@/app/dashboard/_components/Header";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";

import { use } from "react";

export default function Course({ params }) {
  const [course, setCourse] = useState();
  const resolvedParams = use(params);

  const GetCourse = async () => {
    if (!resolvedParams?.courseId) {
      console.warn("courseId saknas i params");
      return;
    }

    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.courseId, resolvedParams.courseId));
      setCourse(result[0]);
    } catch (error) {
      console.error("Fel vid hämtning av kursdata:", error);
    }
  };

  useEffect(() => {
    if (resolvedParams?.courseId) {
      GetCourse();
    }
  }, [resolvedParams]);

  return (
    <div>
      <Header />
      <div className="px-10 p-10 md:px-20 lg:px-44">
        <CourseBasicInfo course={course} edit={false} />
        <CourseDetails course={course} />
        <ChapterList course={course} />
      </div>
    </div>
  );
}
