"use client";
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "text" | "image";
  minHeight?: string;
}

export function Card({
  children,
  className = "",
  variant = "text",
  minHeight = "min-h-[200px] sm:min-h-[250px]"
}: CardProps) {
  if (variant === "image") {
    return (
      <div className={`size-full bg-black rounded-xl overflow-hidden relative outline-black outline-2 sm:outline-4 ${minHeight} ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`bg-zinc-950 rounded-xl relative text-white p-4 sm:p-6 lg:p-8 text-base sm:text-lg lg:text-2xl xl:text-3xl font-medium flex ${minHeight} ${className}`}>
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 size-[calc(100%-16px)] sm:size-[calc(100%-24px)] z-10 bg-zinc-900 blur-md"></div>
      <div className="z-40 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export default Card;
