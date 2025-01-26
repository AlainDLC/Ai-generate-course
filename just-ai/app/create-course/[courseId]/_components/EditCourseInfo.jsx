"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";

// gå igonem databas fälten
export default function EditCourseInfo({ course }) {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  useEffect(() => {
    setName(course?.courseOutput?.["Course Name"]);
    setDescription(course?.courseOutput?.["Description"]);
  }, [course]);

  const onUpdateHandler = async () => {
    try {
      course.courseOutput["Course Name"] = name;
      course.courseOutput["Description"] = description;

      const result = await db
        .update(CourseList)
        .set({ courseOutput: course?.courseOutput?.Chapters })

        .returning({ id: CourseList.id });

      console.log(result);
    } catch (err) {
      console.log("fel", err);
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <AiOutlineEdit />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course & Description</DialogTitle>
          <div className="mt-3">
            <DialogDescription>
              <label>Course Title</label>
              <Input
                defaultValue={course?.courseOutput?.["Course Name"]}
                onChange={(event) => setName(event?.target.value)}
              />
              <label>Description</label>
              <Textarea
                className="h-40"
                defaultValue={course?.courseOutput?.["Description"]}
                onChange={(event) => setDescription(event?.target.value)}
              />
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter>
          <DialogClose>
            <div className="mt-3">
              <Button onClick={onUpdateHandler}>Update</Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
