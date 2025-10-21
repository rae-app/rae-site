"use client";
import React from "react";
import { cn } from "@/utils/cn";

interface HeroButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  colors: {
    border: string;
    backgroundStart: string;
    backgroundEnd: string;
    hoverBackground: string;
    innerStart: string;
    innerEnd: string;
  };
  className?: string;
}

const HeroButton: React.FC<HeroButtonProps> = ({
  children,
  onClick,
  colors,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative rounded-lg border-2 font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden",
        className
      )}
      style={{
        borderColor: colors.border,
        background: `linear-gradient(135deg, ${colors.backgroundStart}, ${colors.backgroundEnd})`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = `linear-gradient(135deg, ${colors.hoverBackground}, ${colors.hoverBackground})`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = `linear-gradient(135deg, ${colors.backgroundStart}, ${colors.backgroundEnd})`;
      }}
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `linear-gradient(135deg, ${colors.innerStart}, ${colors.innerEnd})`,
        }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default HeroButton;
export { HeroButton };
