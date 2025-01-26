"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";

export default function FinishScreen({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState(null); // Använd null som standard för ett objekt
  const [loading, setLoading] = useState(true); // Laddningstillstånd
  const [error, setError] = useState(null); // Felhantering
  const router = useRouter();

  useEffect(() => {
    const resolveParamsAndFetchCourse = async () => {
      try {
        const resolvedParams =
          params instanceof Promise ? await params : params;
        if (resolvedParams && user) {
          await GetCourse(resolvedParams);
        }
      } catch (error) {
        console.error("Error resolving params or fetching course:", error);
      }
    };

    resolveParamsAndFetchCourse();
  }, [params, user]);

  const GetCourse = async (resolvedParams) => {
    try {
      setLoading(true);
      setError(null);
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, resolvedParams?.courseId),
            eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );
      setCourse(result[0] || null);
    } catch (error) {
      console.error("Error fetching course:", error);
      setError("Failed to fetch course data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="px-10 md:px-20 lg:px-44 my-7">
      <h2 className="text-center font-bold text-2xl my-3 text-primary">
        Congrats! your course is Ready
      </h2>

      <CourseBasicInfo course={course} />
      <h2 className="mt-3">Course ULR:</h2>
      <h2 className="text-center text-slate-400 border p-2 rounded flex gap-5 items-center">
        {process.env.NEXT_PUBLIC_HOST_NAME}
        /course/view/{course?.courseId}
        <HiOutlineClipboardDocumentCheck
          className="w-5 h-5 cursor-pointer"
          onClick={async () => {
            const url = `${process.env.NEXT_PUBLIC_HOST_NAME}/course/view/${course?.courseId}`;
            await navigator.clipboard.writeText(url);
          }}
        />
      </h2>
    </div>
  );
}
