import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { OverlayProvider } from "../context/OverlayContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Redwood Forest Glass Cabin & Spa Retreat - Airbnb Clone",
  description:
    "Nestled deep in the heart of the Guerneville redwoods, this architecturally unique Glass Cabin offers a perfect synthesis of modern luxury and raw, undisturbed nature.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased text-airbnb-ink bg-white">
        <OverlayProvider>{children}</OverlayProvider>
      </body>
    </html>
  );
}
