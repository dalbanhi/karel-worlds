import { Metadata } from "next";
import React from "react";
import SidebarLayout from "../layout";
import LeftSidebar from "@/components/shared/layout/LeftSidebar";
import RightSidebar from "@/components/shared/layout/RightSidebar";
import { getAllPuzzles } from "@/lib/actions/puzzles";
import { SortOptionType } from "@/types/puzzleDB";
import PuzzleList from "@/components/shared/puzzle-viewing/PuzzleList";
import { getCurrentUser } from "@/lib/auth/checkUser";
import { currentUser } from "@clerk/nextjs/server";
import TagSearchAndFilterDrawer from "@/components/shared/puzzle-viewing/explore/TagSearchAndFilterDrawer";

import dynamic from "next/dynamic";

const PuzzleSearch = dynamic(
  () => import("@/components/shared/puzzle-viewing/explore/PuzzleSearch"),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

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
  const currentDBUser = await getCurrentUser();

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
      <section className="flex min-h-svh w-full grow flex-col justify-start md:w-1/2">
        <h1 className="w-full bg-accent/50 p-2 text-center text-4xl font-semibold">
          {String(metadata.title ?? "Default Title")}
        </h1>
        <PuzzleSearch
          initialSearch={currentSearchTerm}
          initialSort={currentSort}
          initialTag={currentTag}
          baseRoute="explore"
        />
        <TagSearchAndFilterDrawer
          searchParams={searchParams}
          baseRoute="explore"
        />
        <div className="flex h-full grow">
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
