/* eslint-disable tailwindcss/no-custom-classname */
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import React from "react";

import { Metadata } from "next";
import { PuzzleWithMoreStuff } from "@/types/puzzleExtensions";
import PuzzleCard from "@/components/shared/home/dashboard/PuzzleCard";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import Link from "next/link";
import SidebarLayout from "../layout";
import LeftSidebar from "@/components/shared/layout/LeftSidebar";
import RightSidebar from "@/components/shared/layout/RightSidebar";
import { getUserPuzzles } from "@/lib/actions/puzzles";
import { getCurrentUser } from "@/lib/auth/checkUser";

export const metadata: Metadata = {
  title: "My Stuff",
  description:
    "A place to store your Karel Worlds puzzles and view your classes",
};

const MyDashboard = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/");
  }
  const currentDBUser = await getCurrentUser();
  if (!currentDBUser) {
    redirect("/");
  }

  const currentTab = Array.isArray(searchParams.view)
    ? searchParams.view[0]
    : (searchParams.view ?? "my-puzzles");

  const possibleTabs = ["my-puzzles", "liked-puzzles", "solved-puzzles"];
  if (!possibleTabs.includes(currentTab)) {
    redirect("/my-stuff?view=my-puzzles");
  }

  const puzzlesToShow: PuzzleWithMoreStuff[] = JSON.parse(
    await getUserPuzzles(currentDBUser.id, currentTab)
  );
  console.log(puzzlesToShow);

  const tabsClassName =
    "inline-flex items-center justify-center whitespace-nowrap border-b-2 rounded-sm rounded-b-none border-primary px-3 py-1.5 text-sm font-medium ring-offset-background transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-ring data-[state=active]:border-x-2 data-[state=active]:border-primary data-[state=active]:border-t-2 data-[state=active]:border-b-0 data-[state=active]:rounded-t-sm data-[state=active]:rounded-b-none data-[state=active]:border-b-none";

  return (
    <SidebarLayout>
      <LeftSidebar
        searchParams={searchParams}
        baseRoute={"my-stuff"}
      ></LeftSidebar>
      <section className="flex min-h-screen w-full flex-col justify-start md:w-1/2">
        <h1 className="w-full bg-accent/50 p-2 text-center text-4xl font-semibold">
          {String(metadata.title ?? "Default Title")}
        </h1>
        <div className="inline-flex h-10 items-center justify-center rounded-none bg-muted p-1 text-muted-foreground">
          <ButtonGroup
            className="p-2"
            orientation="horizontal"
            areCardButtons={false}
          >
            <Link
              className={tabsClassName}
              href="/my-stuff?view=my-puzzles"
              data-state={currentTab === "my-puzzles" ? "active" : ""}
            >
              My Puzzles
            </Link>
            <Link
              className={tabsClassName}
              href="/my-stuff?view=liked-puzzles"
              data-state={currentTab === "liked-puzzles" ? "active" : ""}
            >
              Liked Puzzles
            </Link>
            <Link
              className={tabsClassName}
              href="/my-stuff?view=solved-puzzles"
              data-state={currentTab === "solved-puzzles" ? "active" : ""}
            >
              Solved Puzzles
            </Link>
            {/* <Link
              className={tabsClassName}
              href="/my-stuff?view=my-classes"
              data-state={currentTab === "my-classes" ? "active" : ""}
            >
              My Classes
            </Link> */}
          </ButtonGroup>
        </div>
        <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <div className="flex flex-wrap justify-center gap-4 p-4">
            {puzzlesToShow.length > 0 &&
              puzzlesToShow.map((puzzle: PuzzleWithMoreStuff) => {
                return (
                  <PuzzleCard
                    key={puzzle.id}
                    puzzleInfo={puzzle}
                    viewerImage={clerkUser.imageUrl}
                    viewerID={currentDBUser.id}
                  />
                );
              })}
            {puzzlesToShow.length === 0 && <p>No puzzles to show</p>}
          </div>
        </div>
      </section>
      <RightSidebar searchParams={searchParams}></RightSidebar>
    </SidebarLayout>
  );
};

export default MyDashboard;
