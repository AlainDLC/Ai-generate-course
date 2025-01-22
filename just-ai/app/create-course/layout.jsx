"use client";
import React, { useState } from "react";
import Header from "../dashboard/_components/Header";
import { UseInputContext } from "../_context/UseInputContext";

export default function CreateCourseLayout({ children }) {
  const [userCourseInput, setUserCourseInput] = useState([]);
  return (
    <div>
      <UseInputContext.Provider value={{ userCourseInput, setUserCourseInput }}>
        <Header />
        {children}
      </UseInputContext.Provider>
    </div>
  );
}
