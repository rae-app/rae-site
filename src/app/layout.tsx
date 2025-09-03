import Blobs from "@/components/ui/Blobs";
import Loader from "@/components/ui/Loader";
import Navbar from "@/components/ui/Navbar";
import ReactLenis from "lenis/react";
import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";

import Footer from "@/components/ui/Footer";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  weight: ["400", "500", "600", "700"],
});


export const metadata: Metadata = {
  title: "Rae",
  description: "Rae is the first True AI Assistant.",
  icons: {
    icon: "/",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` ${instrumentSans.className} bg-white overflow-x-hidden text-black antialiased`}
      >
        <Loader />
        <Navbar />
        <Blobs />
        <ReactLenis root>{children}</ReactLenis>
        <Footer />  
      </body>
    </html>
  );
}
