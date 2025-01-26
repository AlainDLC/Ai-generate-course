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
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";

export default function EditChapter({ course, index }) {
  const [name, setName] = useState();
  const [about, setAbout] = useState();
  const courseOutout = course?.courseOutput?.Chapters;

  useEffect(() => {
    setName(courseOutout?.[index]?.["Chapter Name"]);
    setAbout(courseOutout?.[index]?.About);
  }, [course]);

  const onUpdateHandler = () => {
    //let courseName = courseOutout?.[index]?.["Chapter Name"];
    course.courseOutput.Chapters.About = about;
    course.courseOutput.Chapters["Chapter Name"] = name;

    // courseName = name;
  };
  return (
    <Dialog>
      <DialogTrigger>
        <AiOutlineEdit />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chapter</DialogTitle>
          <div className="mt-4">
            <DialogDescription>
              <label>Course Title</label>
              <Input
                defaultValue={courseOutout?.[index]?.["Chapter Name"]}
                onChange={(e) => setName(e?.target.value)}
              />
              <label>Description</label>
              <Textarea
                className="h-40"
                defaultValue={courseOutout?.[index]?.About}
                onChange={(e) => setAbout(e?.target.value)}
              />
            </DialogDescription>
          </div>
        </DialogHeader>

        <div>
          <DialogFooter>
            <DialogClose>
              <Button onClick={onUpdateHandler}>Update</Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
