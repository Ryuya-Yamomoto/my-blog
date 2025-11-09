import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import { ContextProvider } from "@/app/contexts/context";
import { LenisProvider } from "./hooks/lenisProvider";
import { cn } from "@/lib/utils";

import Header from "./components/common/header/header";
import Footer from "./components/common/footer/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ryuya Yamamoto",
  description: "Ryuya Yamamoto's Portfolio Site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LenisProvider />
      <html lang="ja">
        <body
          className={cn(
            geistSans.variable,
            geistMono.variable,
            "flex min-h-screen flex-col"
          )}
        >
          <ContextProvider>
            <Header />
            <main className="w-full flex-grow overflow-clip pt-16">
              {children}
            </main>
            <Footer />
          </ContextProvider>
        </body>
      </html>
    </>
  );
}
