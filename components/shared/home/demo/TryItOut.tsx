"use client";
import React from "react";
import { montserrat } from "@/app/fonts";
import Puzzle from "@/components/shared/puzzle/Puzzle";
import { puzzleImagesType, worldInfoType } from "@/types/karelWorld";
import { windowSizeType } from "@/types";

interface PuzzleProps {
  worldDimensions: windowSizeType;
  puzzleImages: puzzleImagesType;
  startWorldInfo: worldInfoType;
  goalWorldInfo: worldInfoType;
}

const TryItOut: React.FC<PuzzleProps> = ({
  worldDimensions,
  puzzleImages,
  startWorldInfo,
  goalWorldInfo,
}) => {
  return (
    <div className={`flex w-full flex-col items-center gap-2 p-4 `}>
      <div className="w-7/12">
        <h1
          className={`text-center text-lg font-bold md:text-2xl ${montserrat.className}`}
        >
          Who is Karel?
        </h1>
        <p className="text-base font-semibold md:text-lg">
          Karel is a friendly robot who follows some simple commands. Run the
          program and add to it with blocks to try to solve your first Karel
          Puzzle!
        </p>
      </div>
      <div className="h-fit w-full rounded-lg bg-card">
        <Puzzle
          worldDimensions={worldDimensions}
          puzzleImages={puzzleImages}
          startWorldInfo={startWorldInfo}
          goalWorldInfo={goalWorldInfo}
          puzzleName="Example Puzzle"
        />
      </div>
    </div>
  );
};
export default TryItOut;
