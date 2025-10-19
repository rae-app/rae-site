"use client";

import { useTheme } from "@/hooks/useTheme";

const Navbar = ({}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="h-[58px] z-50 shrink-0 flex w-full border-b border-border fixed top-0 bg-gradient-to-b  from-background to-background/20 backdrop-blur-xs ">
      <div className="mx-auto border-x border-border px-8 w-[1200px] h-full flex items-center ">
        <h1 className="text-xl  font-medium !m-0 flex gap-2 items-center ">
          <div className="size-4 rounded-full border-3 border-accent"></div> Rae
        </h1>
        {/*<div className="ml-auto gap-2 text-sm flex h-full items-center"></div>*/}

        <div className=" h-full ml-auto text-sm flex gap-2 items-center">
          <div className="cursor-pointer h-[28px] px-2 hover:bg-border/40 flex items-center rounded-sm">
            About
          </div>
          <div className="cursor-pointer h-[28px] px-2 hover:bg-border/40 flex items-center rounded-sm">
            Features
          </div>
          <div className="cursor-pointer h-[28px] mr-4 px-2 hover:bg-border/40 flex items-center rounded-sm">
            Contact
          </div>
          {/*<div
            onClick={toggleTheme}
            className="cursor-pointer h-[28px] px-2 hover:bg-border/40 flex items-center rounded-sm"
          >
            Theme
          </div>*/}
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
