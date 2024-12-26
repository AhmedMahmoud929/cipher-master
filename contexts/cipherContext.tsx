"use client";

import { useMediaQuery } from "usehooks-ts";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { toast } from "sonner";

interface CipherContextType {
  isSidebarOpen: boolean;
  isMobile: boolean;
  setIsSidebarOpen: (state: boolean) => void;
}

const CipherContext = createContext<CipherContextType | undefined>(undefined);

export const CipherProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const isMobile = useMediaQuery("(max-width: 1025px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(!isMobile);

  return (
    <CipherContext.Provider
      value={{
        isMobile,
        setIsSidebarOpen,
        isSidebarOpen,
      }}
    >
      {children}
    </CipherContext.Provider>
  );
};

export function useCipherContext() {
  const context = useContext(CipherContext);
  if (!context) {
    throw new Error("useCipherContext must be used within an CipherContext");
  }
  return context;
}
