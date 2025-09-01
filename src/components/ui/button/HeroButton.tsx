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
  height = "auto",
  width = "auto",
  className = "",
  onClick,
  colors = {
    border: "#000000",
    backgroundStart: "#18181b",
    backgroundEnd: "#27272a",
    hoverBackground: "#0a0a0a",
    innerStart: "#27272a",
    innerEnd: "#18181b",
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
        "flex rounded-xl border-2 group items-center justify-center"
      )}
    >
      <motion.div
        initial={{
          y: "-8px",
          background: `linear-gradient(to right, ${colors.backgroundStart}, ${colors.backgroundEnd})`,
        }}
        variants={{
          hover: {
            y: "-2px",
            // background: `linear-gradient(to right, ${colors.hoverBackground}, ${colors.hoverBackground})`,
          },
          tap: {
            y: "0px"
          }
        }}
        onClick={onClick}
        style={{
          height,
          width,
        }}
        className={twMerge(
          "flex items-center px-5 py-2 cursor-pointer duration-200 transition-colors group-hover:brightness-90 text-white font-semibold rounded-xl relative",
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
          className="absolute  pointer-events-none left-1/2 -translate-x-1/2 rounded-lg top-1/2 -translate-y-1/2 transition-colors blur-[1px]"
        />
      </motion.div>
    </motion.button>
  );
};

export default HeroButton;
