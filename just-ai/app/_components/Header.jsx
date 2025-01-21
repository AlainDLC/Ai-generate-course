import { Button } from "@/components/ui/button";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-5 shadow-sm">
      {/* Logotypen till vänster */}
      <Image src={"/kaw.jpg"} width={100} height={100} alt="logo" />

      {/* Knapparna längst till höger */}
      <div className="flex items-center gap-4 ml-auto">
        <Button>Get Started</Button>
        <UserButton />
      </div>
    </div>
  );
}
