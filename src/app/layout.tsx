import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import Footer from "@/components/Footer";
import HashScroller from "@/components/HashScroller";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import "./globals.css";

const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], axes: ["opsz"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "StudioSpace — Book creative studios by the hour", template: "%s · StudioSpace" },
  description: "StudioSpace is a peer-to-peer marketplace for photo studios, film stages, podcast lounges, music suites and art workshops.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Providers>
          <Navbar />
          <HashScroller />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
