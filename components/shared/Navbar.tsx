"use client";

import { useState } from "react";
import {
  Bell,
  Search,
  Sidebar,
  Slash,
  Menu,
  X,
  Info,
  Sun,
  Moon,
  Github,
} from "lucide-react";
import Link from "next/link";

import { useCipherContext } from "@/contexts/cipherContext";
import { Button } from "@/components/ui/button";
import { User, Settings, LogOut } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar({ title }: { title: string }) {
  const { isMobile, isSidebarOpen, setIsSidebarOpen } = useCipherContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative h-16 py-5 px-4 md:px-6 border-b w-full flex items-center justify-between bg-white">
      {/* LEFT */}
      <div className="flex items-center gap-2 md:gap-4">
        <Sidebar
          role="button"
          className="text-gray-400 cursor-pointer"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <h1 className="text-xl font-semibold text-[#018270]">{title}</h1>
      </div>

      {/* RIGHT */}
      <Link href={"https://github.com/AhmedMahmoud929/"} target="_blank">
        <Button
          variant="outline"
          className="text-muted-foreground"
          size={"icon"}
        >
          <Github />
        </Button>
      </Link>
    </div>
  );
}
