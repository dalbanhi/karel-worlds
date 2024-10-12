/* eslint-disable tailwindcss/no-custom-classname */
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import React from "react";

import { Metadata } from "next";
import { Puzzle } from "@prisma/client";
import PuzzleCard from "@/components/shared/home/dashboard/PuzzleCard";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import SidebarLayout from "../layout";
import LeftSidebar from "@/components/shared/layout/LeftSidebar";
import RightSidebar from "@/components/shared/layout/RightSidebar";

export const metadata: Metadata = {
  title: "My Stuff",
  description:
    "A place to store your Karel Worlds puzzles and view your classes",
};

const exampleTag = {
  name: "beginner",
  color: "bg-green-500",
};

const examplePuzzle1: Puzzle = {
  id: "1234",
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "My First Puzzle",
  description: "This is a puzzle",
  // tags: ["beginner", "loops"],
  worldWidth: 2,
  worldHeight: 2,
  hints: ["Use the move() function to move Karel"],
  karelImage: "",
  beeperImage: "",
  wallImage: "",
  backgroundImage: "",
  startWorldInfo: {
    karel: {
      x: 0,
      y: 0,
      direction: "east",
    },
    beepers: [],
    walls: [],
  },
  goalWorldInfo: {
    karel: {
      x: 1,
      y: 1,
      direction: "east",
    },
    beepers: [],
    walls: [],
  },
  creatorId: "user_2lLy2QBFPFE2Ewry7L7hl2yqDyR",
  rating: 0,
  difficulty: 0,
  totalRatings: 0,
  totalRatingsSum: 0,
  difficultyRating: 0,
  difficultyRatingSum: 0,
};

const examplePuzzle2: Puzzle = {
  id: "1234",
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "My Second Puzzle",
  description: "This is not a puzzle",
  // tags: ["beginner", "loops"],
  worldWidth: 4,
  worldHeight: 4,
  hints: ["Use the move() function to move Karel"],
  karelImage: "",
  beeperImage: "",
  wallImage: "",
  backgroundImage: "",
  startWorldInfo: {
    karel: {
      x: 0,
      y: 0,
      direction: "east",
    },
    beepers: [],
    walls: [],
  },
  goalWorldInfo: {
    karel: {
      x: 1,
      y: 1,
      direction: "east",
    },
    beepers: [],
    walls: [],
  },
  creatorId: "user_2lLy2QBFPFE2Ewry7L7hl2yqDyR",
  rating: 0,
  difficulty: 0,
  totalRatings: 0,
  totalRatingsSum: 0,
  difficultyRating: 0,
  difficultyRatingSum: 0,
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

  const currentTab = Array.isArray(searchParams.view)
    ? searchParams.view[0]
    : (searchParams.view ?? "my-puzzles");

  const possibleTabs = ["my-puzzles", "liked-puzzles", "solved-puzzles"];
  if (!possibleTabs.includes(currentTab)) {
    redirect("/my-stuff?view=my-puzzles");
  }

  const fakePuzzles1 = [
    examplePuzzle1,
    examplePuzzle1,
    examplePuzzle1,
    examplePuzzle1,
  ];

  const fakePuzzles2 = [examplePuzzle1, examplePuzzle2, examplePuzzle1];

  const puzzlesToShow =
    currentTab === "my-puzzles" ? fakePuzzles1 : fakePuzzles2;

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
            {puzzlesToShow.map((puzzle) => {
              return <PuzzleCard key={puzzle.id} puzzleInfo={puzzle} />;
            })}
          </div>
        </div>
      </section>
      <RightSidebar searchParams={searchParams}></RightSidebar>
    </SidebarLayout>
  );
};

export default MyDashboard;
