import type { Metadata } from "next";
import { Noto_Sans_JP, Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { LenisProvider } from "./provider/lenisProvider";
import { getCategories, getBlogs } from "@/libs/microcms";
import { ThemeProvider } from "next-themes";

import Header from "./components/common/header/header";
import Footer from "./components/common/footer/footer";

// Noto Sans JP (Google Fonts)
const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Inter (Google Fonts) - Helvetica alternative
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ryuya Yamamoto",
  description: "Ryuya Yamamoto's Portfolio Site",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [categories, blogs] = await Promise.all([
    getCategories(),
    getBlogs({}),
  ]);

  return (
    <>
      <LenisProvider />
      <html
        lang="ja"
        className={`${notoSansJP.variable} ${inter.variable}`}
        suppressHydrationWarning
      >
        <body className="font-noto-sans-jp flex min-h-screen flex-col">
          <ThemeProvider storageKey="theme">
            <Header categories={categories.contents} blogs={blogs.contents} />
            <main className="w-full flex-grow overflow-clip pt-48">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
