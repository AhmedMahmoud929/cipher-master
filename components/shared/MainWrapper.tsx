"use client";
import { useCipherContext } from "@/contexts/cipherContext";
import { cn } from "@/lib/utils";
import React from "react";

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMobile, isSidebarOpen } = useCipherContext();
  return (
    <main
      className={cn(
        "relative flex flex-col h-screen flex-grow duration-500 ease-in-out",
        isSidebarOpen && !isMobile
          ? "left-[320px] max-w-[calc(100%-320px)]"
          : "left-[55px] max-w-[calc(100%-55px)]",
        isMobile && "left-0 max-w-full"
      )}
    >
      {children}
    </main>
  );
}
