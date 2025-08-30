import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Sans } from "next/font/google";
import ReactLenis from "lenis/react";
import "./globals.css";
import Blobs from "@/components/ui/Blobs";
import Navbar from "@/components/ui/Navbar";
import Loader from "@/components/ui/Loader";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Rae",
  description: "Rae is an invisible desktop assistant that takes care of tasks for you, right on your screen",
  icons: {
    icon: "/"
  }
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
        <ReactLenis root>
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
