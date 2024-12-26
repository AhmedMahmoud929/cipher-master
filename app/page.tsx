"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Lock,
  Unlock,
  Copy,
  RefreshCw,
  Key,
  FileText,
  Shuffle,
  Grid,
  Hash,
  Binary,
  Menu,
  Sun,
  Moon,
  Info,
  Settings,
} from "lucide-react";
import { useTheme } from "next-themes";
import MainWrapper from "@/components/shared/MainWrapper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCipherContext } from "@/contexts/cipherContext";
import Navbar from "@/components/shared/Navbar";
import Image from "next/image";
import { motion } from "framer-motion";
import { slideInFromBottom } from "@/lib/animationVariants";
import { algorithms } from "@/lib/algorithms";

export default function EncryptionDashboard() {
  // useEffect(() => {
  //   const enc = algorithms["rail-fence"].encrypt("ahmed", "3");
  //   const dec = algorithms["rail-fence"].decrypt(enc, "3");
  //   alert(dec);
  // }, []); // ! Remove that later
  return (
    <MainWrapper>
      <div className="flex-1 flex flex-col lg:overflow-hidden">
        <Navbar title="Playfair Cipher" />

        <main className="flex-1 flex flex-col justify-center items-center bg-gray-100">
          <Image
            src={"/home-guy.svg?random=" + Date.now()}
            alt="Cipher Master"
            width={500}
            height={500}
          />
          <motion.h1
            initial="initial"
            animate="animate"
            variants={slideInFromBottom}
            className="text-[#018270]s text-xl md:text-2xl text-center mt-6 mb-14"
          >
            Please choose from the list in the left
          </motion.h1>
        </main>
      </div>
    </MainWrapper>
  );
}
