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

export default function CreateCourse() {
  const { userCourseInput, setUserCourseInput } = useContext(UseInputContext);
  const [activeIndex, setActiveIndex] = useState(0);

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
  return (
    <div>
      <div className="flex flex-col items-center mt-10">
        <h2 className="text-4xl font-medium text-primary">Create Course</h2>
        <div className="flex mt-10">
          {StepperOptions.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                <div
                  className={`bg-slate-200 p-3 rounded-full text-white ${
                    activeIndex >= index && "bg-green-300"
                  }`}
                >
                  <div>{item.icon}</div>
                </div>
                <h2 className="hidden md:block md:text-sm">{item.name}</h2>
              </div>
              {index != StepperOptions?.length - 1 && (
                <div
                  className={`h-1 w-[50px] md:w-[100px] lg:w-[170px] bg-slate-300
                    ${activeIndex - 1 >= index && "bg-green-400"}`}
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
            <Button onClick={() => setActiveIndex(activeIndex + 1)}>
              Next
            </Button>
          )}
          {activeIndex === 2 && (
            <Button onClick={() => setActiveIndex(activeIndex + 1)}>
              Generate Course Layout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
