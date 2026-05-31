import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { NextAuthProvider } from "./lib/next-auth/provider";
import { Suspense } from "react";
import LoadingSpinner from "./loding";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Book Commerce App",
  description: "Book Commerce App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextAuthProvider>
          <Header />
          <Suspense fallback={<LoadingSpinner />}>
            {children}
          </Suspense>
        </NextAuthProvider>
      </body>
    </html>
  );
}
