import React from "react";
import Puzzle from "@/components/shared/puzzle/Puzzle";
import { getPuzzle } from "@/lib/actions/puzzles";
import { worldInfoType } from "@/types/karelWorld";
import { getCurrentUser } from "@/lib/auth/checkUser";
import PuzzleActionButtons from "@/components/shared/puzzle/PuzzleActionButtons";

const PuzzlePage = async ({ params }: { params: { id: string } }) => {
  //get the id from the route params

  const puzzle = await getPuzzle(params.id);
  const currUser = await getCurrentUser();

  if (!puzzle) {
    return <div>loading...</div>;
  }
  const hasSolved = currUser?.puzzlesSolved.includes(puzzle);
  return (
    <div className="w-full">
      <PuzzleActionButtons
        currentUserID={currUser?.id || ""}
        puzzleID={puzzle.id}
        hasSolved={hasSolved}
      />
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
        puzzleInfoFromDB={puzzle}
        currentUserID={currUser?.id || ""}
      />
    </div>
  );
};

export default PuzzlePage;
