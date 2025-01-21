import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-5 shadow-sm">
      <Image src={"/coding.png"} width={160} height={160} alt="coding" />
      <UserButton />
    </div>
  );
}
