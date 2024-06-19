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
          <div className="fixed inset-0 -z-10 flex h-screen w-screen justify-center">
            <div className="radial-background block h-full w-full max-w-lg opacity-40 blur-[70px] saturate-150"></div>
          </div>
          <Navbar />
          <div className="mx-2 mt-[64px] animateBottomToTop">{children}</div>
        </div>
      </body>
    </html>
  );
}
