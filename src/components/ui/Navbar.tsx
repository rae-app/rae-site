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
        className="h-[20px] px-4 sm:px-6 lg:px-8 overflow-hidden relative cursor-pointer"
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
          style={{ color: '#353839' }}
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
          style={{ color: '#353839' }}
        >
          {children}
        </motion.div>
      </motion.div>
    </>
  );
};

function Navbar() {
  const router = useRouter();
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
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`sticky top-0 left-0 w-full z-[1000] h-[80px] sm:h-[120px] px-0 py-0 bg-transparent transition-colors`}
    >
      {/* Full-width background */}
      <AnimatePresence>
        {(scrolled || isOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 w-full ${
              isOpen ? "h-auto min-h-full" : "h-full"
            } bg-gradient-to-b from-[#fffbeb] to-transparent via-[#fffbeb] pointer-events-none -z-10`}
            style={{
              height: isOpen ? "auto" : "100%",
              minHeight: isOpen ? "65vh" : "auto",
            }}
          />
        )}
      </AnimatePresence>
      <div className="flex max-w-[1400px] bg-transparent w-full items-center px-4 sm:px-6 lg:px-8 py-3 sm:py-6 h-[60px] sm:h-[90px] mx-auto">
        {/* Logo */}
        <div className="flex items-center z-20">
          <Link href="/">
            <div className="flex items-center space-x-1">
              <div
                className="size-4 sm:size-5 border-3 sm:border-4 rounded-full"
                style={{ borderColor: "#e53437" }}
              ></div>
              <span className="text-xl sm:text-2xl font-bold text-black">
                Rae
              </span>
            </div>
          </Link>
        </div>

        {/* Center Links */}
        <div className="hidden h-full z-20 items-center md:flex flex-1 font-bold justify-center">
          <NavbarButton to="/">HOME</NavbarButton>
          <NavbarButton to="/info/about">ABOUT</NavbarButton>
          <NavbarButton to="/info/waitlist">WAITLIST</NavbarButton>
        </div>

        {/* CTA (hidden on mobile) */}
        <div className="hidden md:flex h-full items-center justify-end">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button onClick={() => router.push('/coming-soon')}>
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="1" y="1" width="10" height="10" fill="#F25022" />
                <rect x="13" y="1" width="10" height="10" fill="#00A4EF" />
                <rect x="1" y="13" width="10" height="10" fill="#7FBA00" />
                <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
              </svg>
              COMING SOON
            </Button>
          </motion.div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden ml-auto text-black">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-black/5 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 w-full bg-transparent flex flex-col items-center space-y-6 md:hidden pointer-events-auto py-8"
            style={{ pointerEvents: "auto" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              <Link
                href="/"
                className="text-gray-700 hover:text-gray-900 font-bold text-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                HOME
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link
                href="/info/about"
                className="text-gray-700 hover:text-gray-900 font-bold text-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                ABOUT
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Link
                href="/info/waitlist"
                className="text-gray-700 hover:text-gray-900 font-bold text-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                WAITLIST
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  href="/coming-soon"
                  className="flex items-center gap-2 px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="1" y="1" width="10" height="10" fill="#F25022" />
                    <rect x="13" y="1" width="10" height="10" fill="#00A4EF" />
                    <rect x="1" y="13" width="10" height="10" fill="#7FBA00" />
                    <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
                  </svg>
                  Coming Soon
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
