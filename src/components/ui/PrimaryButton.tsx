import React from "react";
import { cn } from "@/utils/cn";

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "button rounded-sm flex gap-2 items-center text-sm text-background dark:text-white px-3 shadow-button bg-gradient-to-t from-black to-zinc-800 dark:from-accent/80 dark:to-accent font-medium",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PrimaryButton.displayName = "PrimaryButton";

export default PrimaryButton;
