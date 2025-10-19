import Features from "@/components/sections/Features";
import Landing from "@/components/sections/Landing";
import React from "react";

export default function Page() {
  return (
    <div>
      <Landing />
      <Features />
      <div className="h-[200vh] shrink-0"></div>
    </div>
  );
}
