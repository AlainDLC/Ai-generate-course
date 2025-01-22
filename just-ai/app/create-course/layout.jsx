import React from "react";
import Header from "../dashboard/_components/Header";

export default function CreateCourseLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
