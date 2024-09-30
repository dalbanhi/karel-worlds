import type { Metadata } from "next";
import type { Viewport } from "next";
import LeftSidebar from "@/components/shared/layout/LeftSidebar";
import RightSidebar from "@/components/shared/layout/RightSidebar";

export default function SidebarLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { route: string };
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
