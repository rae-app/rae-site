"use client";
import HeroButton from "@/components/ui/button/HeroButton";
import React from "react";

const page = () => {
  return (
    <div className="h-[80vh] mb-[120px] z-40 flex items-center justify-center w-full  flex-col gap-12">
      <div className="absolute z-10 text-[30vw] text-transparent bg-clip-text bg-gradient-to-b from-accent to-transparent font-bold">404</div>
      <div className="size-full z-20 flex flex-col gap-12 items-center justify-center text-4xl font-bold ">
        NOTHING TO SEE HERE
        <HeroButton className="px-4 py-2 text-lg">GO TO HOME</HeroButton>
      </div>
    </div>
  );
};

export default page;
