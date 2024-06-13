import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mai Tri Thanh",
  description: "Mai Tri Thanh Personal Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <Navbar />
          <div className="mx-2 mt-[64px] animateBottomToTop">{children}</div>
        </div>
      </body>
    </html>
  );
}
