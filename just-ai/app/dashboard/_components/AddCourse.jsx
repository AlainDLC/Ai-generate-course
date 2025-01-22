"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export default function AddCourse() {
  const { user } = useUser();
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl">
          Hello{" "}
          <span className="font-bold text-primary">{user?.fullName} </span>
          <p className="text-sm text-slate-400">
            Create new course with power of AI
          </p>
        </h2>
      </div>
      <Link href={"/create-course"}>
        <Button>+ Create Ai Course</Button>
      </Link>
    </div>
  );
}
