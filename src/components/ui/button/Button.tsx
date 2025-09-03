import React, { ReactNode } from "react";
import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  depth?: string;
}

const Button = ({
  children,
  depth = "10px",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props} // pass down native button props like onClick, disabled, type, etc.
      className={twMerge(
        "flex items-center h-full px-5 py-2 bg-gradient-to-r from-zinc-900 to-zinc-800 cursor-pointer hover:to-zinc-950 hover:from-zinc-950 transition-colors group text-white font-semibold rounded-xl relative overflow-hidden",
        className
      )}
    >
      <motion.div className="z-10 flex gap-4 text-sm items-center">
        {children}
      </motion.div>

      <motion.div
        initial={{
          width: `calc(100% - ${depth})`,
          height: `calc(100% - ${depth})`,
        }}
        className="absolute bg-white pointer-events-none left-1/2 -translate-x-1/2 rounded-lg top-1/2 -translate-y-1/2 bg-gradient-to-r from-zinc-800 to-zinc-900 transition-colors group-hover:to-zinc-900 group-hover:from-zinc-900 blur-[1px]"
      ></motion.div>
    </button>
  );
};

export default Button;
