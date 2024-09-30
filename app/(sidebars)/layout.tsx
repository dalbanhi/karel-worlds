<<<<<<< HEAD
// import { usePathname } from "next/navigation";

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
        <LeftSidebar />
        {children}
        <RightSidebar />
      </div>
    </div>
=======
import type { Metadata } from "next";
import { montserrat } from "@/app/fonts";

// import LeftSidebar from "@/components/shared/LeftSidebar/LeftSidebar";
// import RightSidebar from "@/components/shared/RightSidebar/RightSidebar";
// import MobileNav from "@/components/shared/MobileNav/MobileNav";

// import ToastProvider from "~/lib/providers/ToastProvider";
import type { Viewport } from "next";
import LeftSidebar from "@/components/shared/layout/LeftSidebar";
import RightSidebar from "@/components/shared/layout/RightSidebar";
// import { ToastProvider } from "@radix-ui/react-toast";

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
    <section className="flex min-h-screen w-full p-4">
      <LeftSidebar />
      {children}
      <RightSidebar />
    </section>
>>>>>>> v2-staging
  );
}
