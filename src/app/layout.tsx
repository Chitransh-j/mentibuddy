import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MentiBuddy - a software for therapists",
  description: "Take care of your patients",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-sm text-slate-900 bg-[#e6f1ff] min-h-screen`}>

        {children}  {/*  SWAP OUT THE PAGE.tsx here */}

      </body>
    </html>
  );
}
