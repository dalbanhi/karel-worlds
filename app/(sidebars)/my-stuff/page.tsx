import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Metadata } from "next";
import { Puzzle } from "@prisma/client";
import PuzzleCard from "@/components/shared/home/dashboard/PuzzleCard";

export const metadata: Metadata = {
  title: "My Stuff",
  description:
    "A place to store your Karel Worlds puzzles and view your classes",
};

const examplePuzzle: Puzzle = {
  id: "1234",
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "My First Puzzle",
  tags: ["beginner", "loops"],
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
  creatorId: "1234",
};

const MyDashboard = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/");
  }

  const fakePuzzles = [examplePuzzle, examplePuzzle, examplePuzzle];
  return (
    <section className="flex min-h-screen w-1/2 flex-col justify-start">
      <h1 className="w-full bg-accent/50 p-2 text-center text-4xl font-semibold">
        {String(metadata.title ?? "Default Title")}
      </h1>
      <Tabs defaultValue="my-puzzles" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="my-puzzles">My Puzzles</TabsTrigger>
          <TabsTrigger value="my-liked-puzzles">My Liked Puzzles</TabsTrigger>
          <TabsTrigger value="my-classes">My Classes</TabsTrigger>
        </TabsList>
        <TabsContent value="my-puzzles">
          <div className="flex flex-wrap gap-2 justify-center">
            {fakePuzzles.map((puzzle) => {
              return <PuzzleCard key={puzzle.id} puzzleInfo={puzzle} />;
            })}
          </div>
        </TabsContent>
        <TabsContent value="my-liked-puzzles">
          Change your password here.
        </TabsContent>
        <TabsContent value="my-liked-puzzles">classes here.</TabsContent>
      </Tabs>
    </section>
  );
};

export default MyDashboard;
