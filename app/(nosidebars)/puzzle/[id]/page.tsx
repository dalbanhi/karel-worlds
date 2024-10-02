import React from "react";
import Puzzle from "@/components/shared/puzzle/Puzzle";
import { getPuzzle } from "@/lib/actions/puzzles";
import { worldInfoType } from "@/types/karelWorld";

const PuzzlePage = async ({ params }: { params: { id: string } }) => {
  //get the id from the route params

  const puzzle = await getPuzzle(params.id);
  if (!puzzle) {
    return <div>loading...</div>;
  }
  return (
    <div className="w-full">
      <Puzzle
        worldDimensions={{
          width: puzzle.worldWidth,
          height: puzzle.worldHeight,
        }}
        puzzleImages={{
          background: puzzle.backgroundImage,
          beeper: puzzle.beeperImage,
          karel: puzzle.karelImage,
          wall: puzzle.wallImage,
        }}
        startWorldInfo={puzzle.startWorldInfo as unknown as worldInfoType}
        goalWorldInfo={puzzle.goalWorldInfo as unknown as worldInfoType}
        puzzleName={puzzle.name || ""}
      />
    </div>
  );
};

export default PuzzlePage;
