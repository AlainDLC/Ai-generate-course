"use client";
import { Button } from "@/components/ui/button";
import { Description } from "@radix-ui/react-alert-dialog";
import Link from "next/link";
import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import YouTube from "react-youtube";

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    autoplay: 0,
  },
};

export default function ChapterContent({ chapter, content }) {
  useEffect(() => {
    console.log(content?.videoId);
  }, [content]);
  return (
    <div className="p-10">
      <h2 className="font-medium text-2xl">{chapter?.["Chapter Name"]}</h2>
      <p className="text-slate-400">{chapter?.About}</p>
      <div className="flex justify-center my-6">
        <YouTube videoId={content?.videoId} opts={opts} />
      </div>
      <div>
        {content?.content?.map((item, index) => (
          <div key={index} className="p-5 bg-slate-50 mb-3 rounded-lg">
            <h2 className="font-medium text-lg">{item.title}</h2>

            <p className="whitespace-pre-wrap">{item?.explanation}</p>

            {item?.["Code Example"] && (
              <div className="p-4 bg-black text-white rounded-md mt-3">
                <pre>
                  <code>{item?.["Code Example"]}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
      <Link href={"/dashboard"}>
        <Button>Go Back</Button>
      </Link>
    </div>
  );
}
