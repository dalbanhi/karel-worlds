import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import { Input } from "@/components/ui/input";
import React from "react";
import SidebarLayout from "../layout";
import LeftSidebar from "@/components/shared/layout/LeftSidebar";
import RightSidebar from "@/components/shared/layout/RightSidebar";
import { getAllPuzzles } from "@/lib/actions/puzzles";
import { SortOptionType } from "@/types/puzzleDB";
import PuzzleList from "@/components/shared/puzzle-viewing/PuzzleList";
import { getCurrentUser } from "@/lib/auth/checkUser";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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
  const clerkUser = await currentUser();
  // if (!clerkUser) {
  //   redirect("/");
  // }
  const currentDBUser = await getCurrentUser();
  // if (!currentDBUser) {
  //   redirect("/");
  // }

  const currentSort = Array.isArray(searchParams.sort)
    ? searchParams.sort[0]
    : searchParams.sort;
  const currentTag = Array.isArray(searchParams.tag)
    ? searchParams.tag[0]
    : searchParams.tag;
  const currentSearchTerm = Array.isArray(searchParams.search)
    ? searchParams.search[0]
    : searchParams.search;

  const allPuzzles = await getAllPuzzles(
    currentSort as SortOptionType,
    currentTag,
    currentSearchTerm
  );
  console.log(allPuzzles);
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
        <div>
          <PuzzleList
            viewerId={currentDBUser?.id || ""}
            viewerImage={clerkUser?.imageUrl || ""}
            puzzlesToShow={allPuzzles}
          />
        </div>
      </section>
      <RightSidebar searchParams={searchParams}></RightSidebar>
    </SidebarLayout>
  );
};

export default ExplorePage;
