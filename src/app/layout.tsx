import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ChatWidget from "@/components/ui/ChatWidget";
import SplashCursor from "@/components/ui/SplashCursor";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Judechihan | Software Engineer",
  description: "Personal portfolio - jude",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    url: "https://judedevportfolio.vercel.app/",
    title: "Judechihan | Software Engineer",
    description: "Personal portfolio - jude",
    images: [
      {
        url: "https://judedevportfolio.vercel.app/og-image.jpg",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Judechihan | Software Engineer",
    description: "Personal portfolio - jude",
    images: ["https://judedevportfolio.vercel.app/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.className}`}>
      <body className="relative">
        <SplashCursor />
        <Toaster />
        <ChatWidget />
        {children}
      </body>
    </html>
  );
}
