import { UseInputContext } from "@/app/_context/UseInputContext";
import CategoryList from "@/app/_shared/CategoryList";
import Image from "next/image";
import React, { useContext } from "react";

export default function SelectCategory() {
  const { userCourseInput, setUserCourseInput } = useContext(UseInputContext);

  const handleCategoryChange = (category) => {
    setUserCourseInput((prev) => ({ ...prev, category: category }));
  };
  return (
    <div className="px-10 md:px-20 text-center">
      <h2 className="my-5">Select License Type</h2>
      <div className="grid grid-cols-3 gap-10 ">
        {CategoryList.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col p-5 border rounded-xl items-center hover:border-primary hover:bg-blue-50 cursor-pointer
                ${
                  userCourseInput?.category === item.name &&
                  "border-primary bg-blue-50"
                }`}
            onClick={() => handleCategoryChange(item?.name)}
          >
            <Image src={item.icon} width={50} height={50} alt="icon" />
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
