import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { CipherProvider } from "@/contexts/cipherContext";
import { Toaster } from "sonner";
import Sidebar from "@/components/shared/Sidebar";
import { tajawal } from "@/constants";

export const metadata: Metadata = {
  title: "Cipher Master",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${tajawal.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <CipherProvider>
            <Sidebar />
            {children}
            <Toaster />
          </CipherProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}