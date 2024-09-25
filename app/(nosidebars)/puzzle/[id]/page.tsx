import React from "react";
import Puzzle from "@/components/shared/puzzle/Puzzle";
import { getPuzzle } from "@/lib/actions/puzzles";
import { useParams } from "next/navigation";
import { worldInfoType } from "@/types/karelWorld";

const PuzzlePage = async () => {
  //get the id from the route params
  const { id } = useParams();

  const puzzle = await getPuzzle(id as string);
  if (!puzzle) {
    return <div>loading...</div>;
  }

  return (
    <div className="w-full">
      <Puzzle
        worldDimensions={{
          width: puzzle?.worldWidth,
          height: puzzle?.worldHeight,
        }}
        puzzleImages={{
          background: puzzle.backgroundImage,
          beeper: puzzle.beeperImage,
          karel: puzzle.karelImage,
          wall: puzzle.wallImage,
        }}
        startWorldInfo={
          JSON.parse(
            typeof puzzle?.startWorldInfo === "string"
              ? puzzle.startWorldInfo
              : "{}"
          ) as worldInfoType
        }
        goalWorldInfo={
          JSON.parse(
            typeof puzzle?.goalWorldInfo === "string"
              ? puzzle.goalWorldInfo
              : "{}"
          ) as worldInfoType
        }
        puzzleName={puzzle.name || ""}
      />
    </div>
  );
};

export default PuzzlePage;
