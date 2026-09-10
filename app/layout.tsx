import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { MotionProvider } from "@/lib/motion/MotionProvider";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body-src",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display-src",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Our Little Universe",
  description: "Ruang privat untuk kami berdua.",
  // Aplikasi ini tidak boleh diindeks (fitur 001 FR-004).
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${body.variable} ${display.variable}`}>
      <body>
        <MotionProvider>
          <ToastProvider>{children}</ToastProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
