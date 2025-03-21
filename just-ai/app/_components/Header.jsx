import { Button } from "@/components/ui/button";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-3 shadow-sm">
      {/* Logotypen till vänster */}

      <Image src={"/kaw.jpg"} width={100} height={100} alt="logo" />

      {/* Knapparna längst till höger */}
      <div className="flex items-center gap-6 ml-auto">
        <Button>Get Started</Button>
        <UserButton className="w-8 h-8" />
      </div>
    </div>
  );
}
