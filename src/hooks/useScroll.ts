"use client";

import { useLenis } from "lenis/react";

export const useSmoothScroll = () => {
  const lenis = useLenis();

  const scrollToSection = (sectionId: string) => {
    if (!lenis) return;

    const element = document.getElementById(sectionId);
    if (element) {
      lenis.scrollTo(element, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        offset: -58, // Account for fixed navbar height (58px)
      });
    }
  };

  return { scrollToSection };
};
