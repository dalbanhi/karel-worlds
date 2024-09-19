import type { Metadata } from "next";
import type { Viewport } from "next";
import LeftSidebar from "@/components/shared/layout/LeftSidebar";
import RightSidebar from "@/components/shared/layout/RightSidebar";

export const metadata: Metadata = {
  title: "Karel Worlds",
};

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
    <div className="flex w-full justify-center">
      <div className="flex min-h-screen grow max-sm:flex-col max-sm:items-center md:justify-between xl:w-4/5">
        <LeftSidebar></LeftSidebar>
        {children}
        <RightSidebar></RightSidebar>
      </div>
    </div>
  );
}
