"use client";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import React from "react";
import { HiOutlineHome, HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { SlLogout } from "react-icons/sl";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function SideBar() {
  const Meny = [
    {
      id: 1,
      name: "Home",
      icon: <HiOutlineHome />,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Explore",
      icon: <HiOutlineSquare3Stack3D />,
      path: "/dashboard/explore",
    },
    {
      id: 3,
      name: "Settings",
      icon: <IoShieldCheckmarkOutline />,
      path: "/dashboard/settings",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: <HiOutlineHome />,
      path: "/dashboard/upgrade",
    },
    {
      id: 5,
      name: "Logout",
      icon: <SlLogout />,
      path: "/dashboard/logout",
    },
  ];

  const path = usePathname();

  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md">
      <Image src={"/kaw.jpg"} width={160} height={100} alt="kaw" />
      <div className="my-10" />

      <ul>
        {Meny.map((item, index) => (
          <Link key={index} href={item.path}>
            <div
              className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-slate-100 hover:text-black rounded-lg ${
                item.path === path && "bg-slate-100 text-black"
              }`}
            >
              <div className="text-2xl">{item.icon}</div>
              <h2>{item.name}</h2>
            </div>
          </Link>
        ))}
      </ul>
      <div className="absolute bottom-10 w-[80%]">
        <Progress value={33} />
        <h2 className="text-sm my-2">3 Out of % Courses Created</h2>
        <h2 className="text-xs text-slate-500">
          Upgrade your plan for course generated
        </h2>
      </div>
    </div>
  );
}
