"use client";

import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { and, eq } from "drizzle-orm";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetails from "./_components/CourseDetails";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import { GenerateChapterContent_AI } from "@/configs/AiModel";
import LoadingDialog from "../_components/LoadingDialog";
import service from "@/configs/service";
import { useRouter } from "next/navigation";

export default function CourseLayout({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState(null); // Använd null som standard för ett objekt
  const [loading, setLoading] = useState(false); // Laddningstillstånd, sätt till false initialt
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
        setError("Failed to fetch course data. Please try again later.");
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

  const GenerateChapterContent = async () => {
    if (loading || !course) {
      console.log("Already processing or course data is missing...");
      return; // Om laddning pågår eller om kursdata saknas, stoppa vidare anrop
    }

    setLoading(true); // Startar laddning

    const chapters = course?.courseOutput?.Chapters;

    if (!chapters || chapters.length === 0) {
      console.error("No chapters found.");
      setLoading(false);
      return;
    }

    try {
      // Loopa igenom varje kapitel och vänta på varje operation att slutföras
      for (const [index, chapter] of chapters.entries()) {
        const PROMPT = `
          Explain the concept in Detail on Topic: ${course?.name}, 
          Chapter: ${chapter?.["Chapter Name"]},
          in JSON Format with list of array with field as title, explanation on give chapter in detail, Code Example(Code field in <precode> format) if applicable
        `;
        console.log(PROMPT);

        let videoId = "";

        // Generera innehåll med hjälp av AI
        const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
        const content = JSON.parse(result?.response?.text());

        // Vänta på API-svaret för videon
        const resp = await service.getVideos(
          course?.name + ":" + chapter?.["Chapter Name"]
        );
        console.log(resp);

        // Kontrollera om vi fick ett videoId
        if (resp.length > 0 && resp[0]?.id?.videoId) {
          videoId = resp[0]?.id?.videoId;
        } else {
          console.warn(
            `No video found for Chapter: ${chapter?.["Chapter Name"]}`
          );
        }

        // Spara kapitelinnehåll i databasen om videoId finns
        if (videoId) {
          await db.insert(Chapters).values({
            chapterId: index,
            courseId: course?.courseId,
            content: content,
            videoId: videoId,
          });
        } else {
          console.warn(
            `Skipping chapter ${chapter?.["Chapter Name"]} due to missing videoId`
          );
        }
      }

      // När alla kapitel har sparats, stoppa laddningen och navigera
      setLoading(false);
      router.replace("/create-course/" + course?.courseId + "/finish");
    } catch (e) {
      console.error("Error:", e);
      setError("An error occurred while generating chapter content.");
      setLoading(false); // Stoppa laddningen vid fel
    }
  };

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl text-slate-800">
        Course Layout
      </h2>
      <LoadingDialog loading={loading} />
      {error && <p className="text-red-500">{error}</p>}{" "}
      {/* Visa felmeddelande */}
      <CourseBasicInfo course={course} refreshData={() => GetCourse()} />
      <CourseDetails course={course} />
      <ChapterList course={course} />
      <Button onClick={GenerateChapterContent} className="my-10">
        Generate Course Content
      </Button>
    </div>
  );
}
