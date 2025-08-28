"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Grid2X2, LucideAppWindow, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "./button/Button";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  return (
    <nav className="flex fixed top-0 w-full z-[10000] items-center px-8 py-6 bg-transparent backdrop-blur-sm h-[98px]">
      <div className="flex items-center">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <div className="size-5 border-4 border-black rounded-full"></div>
            <span className="text-2xl font-bold text-black">Rae</span>
          </div>
        </Link>
      </div>

      {/* Center Links*/}
      <div className="hidden h-full items-center md:flex flex-1 font-bold justify-center space-x-8">
        <Link href="/info/about" className="text-zinc-800 hover:text-zinc-900 ">
          ABOUT
        </Link>
        <Link
          href="/info/waitlist"
          className="text-zinc-800 hover:text-zinc-900 "
        >
          WAITLIST
        </Link>
        <a href="/info/price" className="text-zinc-800 hover:text-zinc-900 ">
          PRICING
        </a>
      </div>

      {/* CTA (hidden on mobile) */}
      <div className="hidden md:flex h-full items-center justify-end">
        <Button>
          <svg
        width={18}
        height={18}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 9.5H19.75V0.75H11V9.5ZM0.5 20H9.25V11.25H0.5V20ZM0.5 9.5H9.25V0.75H0.5V9.5ZM11 20H19.75V11.25H11V20Z"
          fill="white"
        />
      </svg>
      GET STARTED
        </Button>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden ml-auto text-black">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center py-4 space-y-4 md:hidden z-50">
          <Link
            href="/info/about"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            ABOUT
          </Link>
          <Link
            href="/info/waitlist"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            WAITLIST
          </Link>
          <a
            href="/info/pricing"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            PRICING
          </a>
          <Link
            href="/get-started"
            className="flex items-center gap-2 px-5 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition"
          >
            <LucideAppWindow size={18} />
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
