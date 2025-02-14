import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {inter, lumanosimo, libre_bodoni, oranienbaum} from '@/app/lib/font';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Memories",
  description: "Enjoy our service and take your precious moment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lumanosimo.variable} ${inter.variable} ${libre_bodoni.variable} ${oranienbaum.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
