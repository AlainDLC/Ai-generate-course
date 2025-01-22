import CategoryList from "@/app/_shared/CategoryList";
import Image from "next/image";
import React from "react";

export default function SelectCategory() {
  return (
    <div className="grid grid-cols-3 gap-10 px-10 md:px-20">
      {CategoryList.map((item, index) => (
        <div
          key={index}
          className="flex flex-col p-5 border rounded-xl items-center hover:border-primary hover:bg-blue-50 cursor-pointer"
        >
          <Image src={item.icon} width={50} height={50} alt="icon" />
          <h2>{item.name}</h2>
        </div>
      ))}
    </div>
  );
}
