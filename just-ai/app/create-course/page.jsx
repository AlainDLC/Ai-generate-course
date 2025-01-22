"use client";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import {
  HiClipboardDocumentCheck,
  HiLightBulb,
  HiMiniSquares2X2,
} from "react-icons/hi2";
import SelectCategory from "./_components/SelectCategory";
import TopicDescriptoin from "./_components/TopicDescription";
import SelectOption from "./_components/SelectOption";
import { UseInputContext } from "../_context/UseInputContext";
import { GenerateCourseLayout_Ai } from "../../configs/AiModel";

export default function CreateCourse() {
  const [isLoading, setIsLoading] = useState(false);
  const { userCourseInput, setUserCourseInput } = useContext(UseInputContext);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    console.log("Active Index:", activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput]);
  const StepperOptions = [
    {
      id: 1,
      name: "Category",
      icon: <HiMiniSquares2X2 />,
    },
    {
      id: 2,
      name: "Topic & Desc",
      icon: <HiLightBulb />,
    },
    {
      id: 3,
      name: "Options",
      icon: <HiClipboardDocumentCheck />,
    },
  ];

  const statusCase =
    userCourseInput?.category === undefined ||
    userCourseInput?.category?.length == 0;
  const statusCase1 =
    userCourseInput?.topic === undefined || userCourseInput?.topic?.length == 0;
  const statusCase2 =
    userCourseInput?.level === undefined ||
    userCourseInput?.level?.length == 0 ||
    userCourseInput?.duration === undefined ||
    userCourseInput?.duration?.length == 0 ||
    userCourseInput?.displayVideo === undefined ||
    userCourseInput?.displayVideo?.length == 0 ||
    userCourseInput?.noOfChapter === undefined ||
    userCourseInput?.noOfChapter?.length == 0;

  const checkStatus = () => {
    if (userCourseInput?.length == 0) {
      return true;
    }

    if (activeIndex == 0 && statusCase) {
      return true;
    }

    if (activeIndex == 1 && statusCase1) {
      return true;
    }
    if (activeIndex == 2 && statusCase2) {
      return true;
    }

    return false;
  };

  const GenerateCourseLayout = async () => {
    setIsLoading(true);
    const BASIC_PROMT =
      "Generate A Course Tutorail on Following Detail With field as Course Name, Description,Along with Chapter Name, about,Duration:";
    const USER_INPUT_PROMP =
      "Category: " +
      userCourseInput?.category +
      " Topic: " +
      userCourseInput?.topic +
      " Level: " +
      userCourseInput?.level +
      " Duration: " +
      userCourseInput?.duration +
      " No Chapters: " +
      userCourseInput?.noOfChapter +
      " in JSON format";
    const FINAL_PROMT = BASIC_PROMT + USER_INPUT_PROMP;

    console.log(FINAL_PROMT);
    try {
      // Ensure the response object is correctly accessed
      const result = await GenerateCourseLayout_Ai?.sendMessage(FINAL_PROMT);
      console.log("Response from AI: ", result?.response?.text());
    } catch (error) {
      console.error("Error in sending message:", error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <div className="flex flex-col items-center mt-10">
        <h2 className="text-4xl font-medium text-primary">Create Course</h2>
        <div className="flex mt-10">
          {StepperOptions.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                <div
                  className={`p-3 rounded-full text-white transition-all duration-300 ${
                    activeIndex >= index ? "bg-green-300" : "bg-slate-200"
                  }`}
                >
                  <div>{item.icon}</div>
                </div>
                <h2 className="hidden md:block md:text-sm">{item.name}</h2>
              </div>
              {index !== StepperOptions.length - 1 && (
                <div
                  className={`h-1 w-[50px] md:w-[100px] lg:w-[170px] transition-all duration-300 ${
                    activeIndex > index ? "bg-green-400" : "bg-slate-300"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="px-10 md:px-20 lg:px-44 mt-10">
        {/*Component */}
        {activeIndex == 0 ? (
          <SelectCategory />
        ) : activeIndex == 1 ? (
          <TopicDescriptoin />
        ) : (
          <SelectOption />
        )}

        <div className="flex justify-between mt-10">
          <Button
            variant="outline"
            disabled={activeIndex == 0}
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            Previous
          </Button>
          {activeIndex < 2 && (
            <Button
              onClick={() => setActiveIndex(activeIndex + 1)}
              disabled={checkStatus()}
            >
              Next
            </Button>
          )}
          {activeIndex === 2 && (
            <Button
              onClick={() => GenerateCourseLayout()}
              disabled={checkStatus()}
            >
              Generate Course Layout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
