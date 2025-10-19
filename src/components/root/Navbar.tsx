"use client";

import * as React from "react";
import { useTheme } from "@/hooks/useTheme";
import { WindowsLogoIcon } from "@phosphor-icons/react/dist/ssr";

const Navbar = ({}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="h-[58px] flex w-full border-b border-border sticky top-0 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto w-[1200px] h-full flex items-center ">
        <h1 className="text-xl  font-medium !m-0 flex gap-2 items-center ">
          <div className="size-4 rounded-full border-3 border-accent"></div> Rae
        </h1>

        <div className="ml-auto h-full flex gap-2 items-center">
          <button
            onClick={toggleTheme}
            className=""
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          >
            .
          </button>
          <button className="button rounded-sm flex gap-2 items-center text-sm text-background dark:text-white px-3 h-[28px]   shadow-button bg-gradient-to-t from-black to-zinc-800 dark:from-accent/80 dark:to-accent">
            <div className="h-[12px] aspect-square grid grid-cols-2 grid-rows-2 gap-[2px]">
              <div className="bg-white"></div>
              <div className="bg-white"></div>
              <div className="bg-white"></div>
              <div className="bg-white"></div>
            </div>{" "}
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
