"use client";

import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
// Importera 'and' och 'eq' från Drizzle
import { and, eq } from "drizzle-orm";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetails from "./_components/CourseDetails";
import ChapterList from "./_components/ChapterList";

export default function CourseLayout({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState(null); // Använd null som standard för ett objekt
  const [loading, setLoading] = useState(true); // Laddningstillstånd
  const [error, setError] = useState(null); // Felhantering

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
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl text-slate-800">
        Course Layout
      </h2>
      <CourseBasicInfo course={course} />
      <CourseDetails course={course} />
      <ChapterList course={course} />
    </div>
  );
}
