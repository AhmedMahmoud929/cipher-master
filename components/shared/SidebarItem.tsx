"use client";

import { useCipherContext } from "@/contexts/cipherContext";
import { cn } from "@/lib/utils";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarItemProps {
  item: { label: string; icon: React.ReactNode; href: string };
}

function SidebarItem({ item }: SidebarItemProps) {
  const { isSidebarOpen, isMobile, setIsSidebarOpen } = useCipherContext();
  const pathnameArr = usePathname().split("/").slice(1);

  return (
    <li className={cn(isSidebarOpen ? "p-2" : "py-2")}>
      <Link
        href={item.href}
        className={cn(
          "flex items-center duration-500 ease-in-out py-2 px-4 text-white",
          isSidebarOpen ? "gap-2" : "gap-8 mx-2 px-2",
          pathnameArr.includes(item.href) &&
            "bg-white text-[#018270] rounded-md"
        )}
        onClick={() => isMobile && setIsSidebarOpen(false)}
      >
        <span className="h-7 w-7 flex items-center justify-center">
          {item.icon}
        </span>
        <span className="line-clamp-1">{item.label}</span>
      </Link>
    </li>
  );
}

export default SidebarItem;
