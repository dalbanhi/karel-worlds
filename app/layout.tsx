import type { Metadata } from "next";
import "./globals.css";
import { openSans } from "./fonts";
import type { Viewport } from "next";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    template: "%s | KarelWorlds",
    default: "KarelWorlds",
  },
  description: "A fun way to learn programming",
  icons: {
    icon: "/public/images/icon.svg",
  },
};

import { ClerkProvider } from "@clerk/nextjs";

import NavBar from "@/components/shared/layout/NavBar";
import Footer from "@/components/shared/layout/Footer";

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
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#5faba8",
          colorDanger: "#ff8b42",
          colorSuccess: "#adf0d2",
          colorWarning: "#ffc83d",
          colorNeutral: "#1f2141",
          colorText: "#1f2141",
          colorTextOnPrimaryBackground: "#fcfcfd",
          colorTextSecondary: "#5faba8",
          colorBackground: "#fcfcfd",
          colorInputText: "#1f2141",
          colorInputBackground: "#fcfcfd",
        },
      }}
    >
      <html lang="en">
        <body className={openSans.className}>
          <main className="flex min-h-screen w-full flex-col">
            <NavBar />
            <div className="grow">{children}</div>
            <Footer />
            <Toaster />
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
