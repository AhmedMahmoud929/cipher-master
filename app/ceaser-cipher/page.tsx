"use client";

import MainContainer from "@/components/MainContainer";
import MainWrapper from "@/components/shared/MainWrapper";
import Navbar from "@/components/shared/Navbar";
import React from "react";

function page() {
  return (
    <MainWrapper>
      <div className="flex-1 flex flex-col lg:overflow-hidden">
        <Navbar title="Ceaser Cipher" />
        <MainContainer algorithmId="ceaser" />
      </div>
    </MainWrapper>
  );
}

export default page;