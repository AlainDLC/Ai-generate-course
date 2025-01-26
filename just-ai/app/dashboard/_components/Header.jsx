import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-5 shadow-sm">
      <Link href={"/dashboard"}>
        <Image
          className="rounded-sm"
          src={"/coding.png"}
          width={160}
          height={160}
          alt="coding"
        />
      </Link>
      <UserButton />
    </div>
  );
}
