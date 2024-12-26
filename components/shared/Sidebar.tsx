"use client";

import React from "react";
import SidebarItem from "./SidebarItem";
import { sidebarItems } from "@/constants";
import { useCipherContext } from "@/contexts/cipherContext";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Home, Telescope, X } from "lucide-react";
import { Button } from "../ui/button";
import { Anek_Latin } from "next/font/google";
import ConditionedWrapper from "./ConditionedWrapper";
import Link from "next/link";

const paprika = Anek_Latin({
  weight: ["600"],
  subsets: ["latin"],
});

function Sidebar() {
  const { isSidebarOpen, isMobile, setIsSidebarOpen } = useCipherContext();
  return (
    <aside
      className={cn(
        "absolute w-[320px] h-screen z-10 overflow-hidden bg-[#018270]  duration-500 ease-in-out border-r-2",
        isSidebarOpen ? "w-[320px]" : "w-[58px]",
        isMobile && "-left-full top-0 shadow-xl",
        isSidebarOpen && isMobile && "left-0"
      )}
    >
      <ul>
        <span
          className={cn(
            "block py-4",
            isSidebarOpen ? "pl-4" : "pl-2",
            isMobile && "flex items-start justify-between gap-2"
          )}
        >
          <Link
            href={"/"}
            className={`font-bold text-2xl text-white`}
            onClick={() => isMobile && setIsSidebarOpen(false)}
          >
            {isSidebarOpen ? <span>Cipher Master</span> : <span>CM</span>}
          </Link>
          <ConditionedWrapper condition={isMobile}>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="bg-transparent text-white mr-4"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X />
            </Button>
          </ConditionedWrapper>
        </span>
        <div className={cn("duration-500", isSidebarOpen && " px-2")}>
          {sidebarItems.map((item, ix) => (
            <SidebarItem key={ix} item={item} />
          ))}
        </div>
      </ul>
    </aside>
  );
}

export default Sidebar;
