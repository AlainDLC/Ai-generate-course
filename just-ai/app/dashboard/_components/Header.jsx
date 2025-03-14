import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";

  return (
    <div
      className={`flex items-center p-3 shadow-sm ${
        isDashboard ? "justify-end" : "justify-between"
      }`}
    >
      {pathname !== "/dashboard" && (
        <Link href={"/dashboard"}>
          <Image
            className="rounded-sm"
            src={"/a.png"}
            width={160}
            height={160}
            alt="coding"
          />
        </Link>
      )}
      <UserButton />
    </div>
  );
}
