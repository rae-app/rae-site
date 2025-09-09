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
  title: {
    default: "Rae - The First True AI Assistant",
    template: "%s | Rae",
  },
  description:
    "Rae is the first True AI Assistant that understands context, learns from interactions, and provides personalized assistance across all your digital tasks.",
  keywords: [
    "AI assistant",
    "artificial intelligence",
    "personal assistant",
    "AI productivity",
    "smart assistant",
    "AI technology",
    "digital assistant",
    "machine learning",
    "automation",
    "productivity tools",
    "desktop app",
    "windows app",
    "macOS app"
  ],
  authors: [{ name: "Rae Team" }],
  creator: "Sophistic",
  publisher: "Sophistic",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://raeai.app",
    siteName: "Rae",
    title: "Rae - The First True AI Assistant",
    description:
      "Rae is the first True AI Assistant that understands context, learns from interactions, and provides personalized assistance across all your digital tasks.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rae - The First True AI Assistant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rae - The First True AI Assistant",
    description:
      "Rae is the first True AI Assistant that understands context, learns from interactions, and provides personalized assistance across all your digital tasks.",
    images: ["/images/twitter-image.jpg"],
    creator: "@raeai",
    site: "@raeai",
  },
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  alternates: {
    canonical: "https://raeai.app",
  },
  category: "Technology",
  classification: "AI Assistant Software",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/assets/favicon/rae.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/favicon/rae.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/assets/favicon/rae.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#000000",
      },
    ],
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileColor": "#ffffff",
    "theme-color": "#ffffff",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://raeai.app" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/assets/favicon/rae.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/favicon/rae.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Preload critical images */}
        <link rel="preload" href="/assets/images/dragon.gif" as="image" type="image/gif" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body
        className={` ${instrumentSans.className} bg-white overflow-x-hidden text-black antialiased flex flex-col items-center justify-center`}
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
