import type { Metadata } from "next";
import type { Viewport } from "next";
import LeftSidebar from "@/components/shared/layout/LeftSidebar";
import RightSidebar from "@/components/shared/layout/RightSidebar";

export default function SidebarLayout({
  children,
  searchParams,
}: Readonly<{
  children: React.ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
}>) {
  return (
    <div className="flex w-full justify-center">
      <div className="flex min-h-screen grow max-sm:flex-col max-sm:items-center md:justify-between xl:w-4/5">
        <LeftSidebar searchParams={searchParams}></LeftSidebar>
        {children}
        <RightSidebar searchParams={searchParams}></RightSidebar>
      </div>
    </div>
  );
}
