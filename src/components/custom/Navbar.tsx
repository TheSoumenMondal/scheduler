import { UserButton } from "@stackframe/stack";
import { TimerIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center flex-row md:px-56 sm:px-10 px-4 pt-6">
      <div className="text-stone-900 font-bold underline flex gap-1 flex-row">
        <Link href={"/"}>
          <span className="hover:cursor-pointer">SCHEDULER</span>
        </Link>
        <TimerIcon className="w-5 h-5" />
      </div>
      <div className="font-semibold text-sm">
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
