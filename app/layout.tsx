import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import { Lexend_Deca } from "next/font/google";
import { Providers } from "./providers";

const font = Lexend_Deca({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mai Tri Thanh",
  description: "Mai Tri Thanh - Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <Providers>
          <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="mx-auto mt-24 max-w-6xl px-4 pb-20 md:px-6">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
