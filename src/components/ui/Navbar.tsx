"use client";

import { LucideAppWindow, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import Button from "./button/Button";
import { AnimatePresence, motion } from "motion/react";

const NavbarButton = ({
  children,
  to,
}: {
  children: ReactNode;
  to: string;
}) => {
  const router = useRouter();
  return (
    <>
      <motion.div
        onClick={() => router.push(to)}
        whileHover="hover"
        className="h-[20px] px-8  overflow-hidden  text-black relative cursor-pointer"
      >
        <motion.div
          // style={{ transformOrigin: "bottom left" }}
          initial={{ y: "100%" }}
          transition={{ type: "tween", ease: "circInOut" }}
          variants={{
            hover: {
              rotateZ: "0deg",
              y: "0",
            },
          }}
          className="absolute"
        >
          {children}
        </motion.div>
        <motion.div
          className="w-fit"
          // style={{ transformOrigin: "bottom left" }}
          variants={{
            hover: {
              // rotateZ: "-90deg",
              y: "-100%",
            },
          }}
          transition={{ type: "tween", ease: "circInOut" }}
        >
          {children}
        </motion.div>
      </motion.div>
    </>
  );
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // useEffect(() => {
  //   let lastScrollY = window.scrollY;

  //   const handleScroll = () => {
  //     if (window.scrollY > lastScrollY) {
  //       setScrolled(true); // scrolling down → hide navbar
  //     } else {
  //       setScrolled(false); // scrolling up → show navbar
  //     }
  //     lastScrollY = window.scrollY;
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <motion.nav
      animate={{ y: 0 }} // hide/show effect
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0 w-full z-[1000] h-[90px] px-0 py-0 bg-transparent transition-colors`}
    >
      {/* Full-width background */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full h-full bg-gradient-to-b from-yellow-50 to-transparent via-yellow-50 pointer-events-none -z-10"
          />
        )}
      </AnimatePresence>
      <div className="flex max-w-[1400px]  bg-transparent w-full items-center px-8 py-6 h-[90px] mx-auto">
        {/* Logo */}
        <div className="flex items-center z-20">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <div className="size-5 border-4 border-black rounded-full"></div>
              <span className="text-2xl font-bold text-black">Rae</span>
            </div>
          </Link>
        </div>

        {/* Center Links */}
        <div className="hidden h-full  z-20 items-center md:flex flex-1 font-bold justify-center ">
          <NavbarButton to="/info/about">ABOUT</NavbarButton>
          <NavbarButton to="/info/waitlist">WAITLIST</NavbarButton>
          <NavbarButton to="/info/price">PRICING</NavbarButton>
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
    </motion.nav>
  );
}

export default Navbar;
