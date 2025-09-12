"use client";
import React, { ReactNode } from "react";
import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";

interface HeroButtonProps {
  children: ReactNode;
  depth?: string;
  height?: string;
  width?: string;
  className?: string;
  onClick?: () => void;
  colors?: {
    border?: string;
    backgroundStart?: string;
    backgroundEnd?: string;
    hoverBackground?: string;
    innerStart?: string;
    innerEnd?: string;
  };
}

const HeroButton = ({
  children,
  depth = "10px",
  height = "",
  width = "",
  className = "",
  onClick,
  colors = {
    border: "#d1d5db",
    backgroundStart: "#f9fafb",
    backgroundEnd: "#f3f4f6",
    hoverBackground: "#e5e7eb",
    innerStart: "#e5e7eb",
    innerEnd: "#d1d5db",
  },
}: HeroButtonProps) => {
  return (
    <motion.button
      whileHover={"hover"}
      whileTap={"tap"}
      style={{
        borderColor: colors.border,
        backgroundColor: colors.hoverBackground,
      }}
      className={twMerge(
        "flex rounded-md border-2 w-fit group items-center justify-center !p-0  transition-all duration-150", className
      )}
    >
      <motion.div
        initial={{
          y: "-8px",
          background: `linear-gradient(to right, ${colors.backgroundStart}, ${colors.backgroundEnd})`,
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}
        variants={{
          hover: {
            y: "-4px",
            // background: `linear-gradient(to right, ${colors.hoverBackground}, ${colors.hoverBackground})`,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          },
          tap: {
            y: "-1px",
            boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
          }
        }}
        onClick={onClick}
        
        className={twMerge(
          "flex items-center px-5 py-2 cursor-pointer duration-200 transition-colors group-hover:brightness-95 text-white font-semibold rounded-md relative overflow-hidden",
          className
        )}
      >
        <motion.div className="z-10 flex gap-4 items-center">
          {children}
        </motion.div>

        <motion.div
          initial={{
            width: `calc(100% - ${depth})`,
            height: `calc(100% - ${depth})`,
            background: `linear-gradient(to right, ${colors.innerStart}, ${colors.innerEnd})`,
          }}
        //   variants={{
        //     hover: {
        //       background: `linear-gradient(to right, ${colors.innerEnd}, ${colors.innerEnd})`,
        //     },
        //   }}
          className="absolute pointer-events-none left-1/2 -translate-x-1/2 rounded-md top-1/2 -translate-y-1/2 transition-all duration-150 blur-[2px]"
        />
      </motion.div>
    </motion.button>
  );
};

export default HeroButton;
