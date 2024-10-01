import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import { Input } from "@/components/ui/input";
import React from "react";
import SidebarLayout from "../layout";
import LeftSidebar from "@/components/shared/layout/LeftSidebar";
import RightSidebar from "@/components/shared/layout/RightSidebar";

interface ExplorePageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export const metadata: Metadata = {
  title: "Explore",
  description:
    "A place to view, filter and sort all Karel Worlds puzzles by the broader community.",
};

const ExplorePage: React.FC<ExplorePageProps> = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <SidebarLayout>
      <LeftSidebar
        searchParams={searchParams}
        baseRoute="explore"
      ></LeftSidebar>
      <section className="flex min-h-screen w-full flex-col justify-start md:w-1/2">
        <h1 className="w-full bg-accent/50 p-2 text-center text-4xl font-semibold">
          {String(metadata.title ?? "Default Title")}
        </h1>
        <div className="inline-flex h-fit items-center justify-start rounded-none bg-muted p-2 text-muted-foreground">
          <form className="flex h-fit w-full justify-center gap-4 sm:flex-initial">
            <div className="relative w-1/2">
              <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search puzzles"
                className="w-full pl-8"
              />
            </div>
            {/* <div className="relative">
              <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tags..."
                className="w-fit pl-8"
              />
            </div> */}
          </form>
        </div>
      </section>
      <RightSidebar searchParams={searchParams}></RightSidebar>
    </SidebarLayout>
  );
};

export default ExplorePage;
