import React from "react";

export default function Footer() {
  return (
    <div className="bg-zinc-900 text-white w-full h-fit border-t border-border shrink-0 flex flex-col">
      <div className="mx-auto border-x divide-x divide-zinc-800  border-zinc-800 w-[1200px] h-full flex">
        <div className="h-full w-fit shrink-0 flex flex-col p-4">
          <div className="text-4xl flex gap-3 items-center">
            <div className="size-7 border-4 border-accent rounded-full"></div>
            Rae
          </div>
          <div className="mt-4 text-zinc-300 hover:underline cursor-pointer">
            teamraeai@gmail.com
          </div>
          <div className=" text-zinc-300 hover:underline cursor-pointer">
            +91 75508 83806
          </div>
          <div className=" text-zinc-300 hover:underline cursor-pointer">
            Brookefield, Bengaluru, Karnataka, IN
          </div>
        </div>
        <div className=" w-full  overflow-hidden relative"></div>
      </div>
      <div className="border-t border-zinc-800">
        <div className="mx-auto w-[1200px] border-x border-zinc-800 p-4 text-zinc-400">
          Copyright @2025 Rae. All rights reserved.
        </div>
      </div>
    </div>
  );
}
