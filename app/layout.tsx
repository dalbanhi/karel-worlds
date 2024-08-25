import type { Metadata } from "next";
import "./globals.css";
import { openSans } from "./fonts";
import type { Viewport } from "next";

export const metadata: Metadata = {
  title: "Karel Worlds",
  description: "A fun way to learn programming",
  icons: {
    icon: "/public/images/icon.svg",
  },
};

import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <main className="flex min-h-screen w-full flex-col">
          <NavBar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
