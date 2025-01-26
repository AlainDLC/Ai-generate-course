"use client";

import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";

export default function CourseStart({ params }) {
  const [course, setCourse] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [chapterContent, setChapterContent] = useState(null);

  // Unwrap params with React.use()
  const { courseId } = React.use(params);

  useEffect(() => {
    if (courseId) {
      GetCourse(courseId);
    }
  }, [courseId]); // Trigger when courseId changes

  const GetCourse = async (courseId) => {
    if (!courseId) {
      console.warn("courseId saknas i params");
      return;
    }

    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.courseId, courseId));
      setCourse(result[0]);
    } catch (error) {
      console.error("Fel vid hämtning av kursdata:", error);
    }
  };

  const chapters = course?.courseOutput?.Chapters;

  const GetSelectedChapterContent = async (chapterId) => {
    try {
      const result = await db
        .select()
        .from(Chapters)
        .where(
          and(
            eq(Chapters.chapterId, chapterId),
            eq(Chapters.courseId, course?.courseId)
          )
        );

      if (result?.length > 0) {
        setChapterContent(result[0]);
      } else {
        console.warn("No content found for the given chapterId.");
      }
    } catch (error) {
      console.error("Error fetching chapter content:", error);
    }
  };

  return (
    <div>
      <div className="fixed md:w-64 hidden md:block h-screen border-r shadow-sm">
        <h2 className="font-medium text-lg bg-primary p-3 text-white">
          {course?.courseOutput?.["Course Name"]}
        </h2>
        <div>
          {chapters?.map((chapter, index) => (
            <div
              key={index}
              className={`cursor-pointer p-3 hover:bg-purple-50 ${
                selectedChapter?.["Chapter Name"] === chapter?.["Chapter Name"]
                  ? "bg-purple-100"
                  : ""
              }`}
              onClick={() => {
                setSelectedChapter(chapter);
                GetSelectedChapterContent(index); // Hämta innehåll för valt kapitel
              }}
            >
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>

      <div className="md:ml-64">
        <ChapterContent chapter={selectedChapter} content={chapterContent} />
      </div>
    </div>
  );
}
