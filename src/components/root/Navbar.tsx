"use client";

import { useTheme } from "@/hooks/useTheme";

const Navbar = ({}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="h-[58px] z-50 shrink-0 flex w-full border-b border-border fixed top-0 bg-gradient-to-b  from-background toto-background/60 backdrop-blur-xs ">
      <div className="mx-auto border-x border-border px-8 w-[1200px] h-full flex items-center ">
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
