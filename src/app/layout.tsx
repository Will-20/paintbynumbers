import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./ui/globals.css";
import { Navbar } from "./ui/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paint By Numbers Maker",
  description: "Home page to make Paint-By-Numbers templates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gradient-to-br from-pink-400 to-blue-500`}>
        <Navbar/>
        <main className="flex flex-1">
          {children}
        </main>
        
      </body>
    </html>
  );
}
