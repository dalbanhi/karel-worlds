import React from "react";
import { montserrat } from "@/app/fonts";
import Puzzle from "@/components/shared/puzzle/Puzzle";
import {
  examplePuzzleWorldDimensions,
  examplePuzzleWorldImages,
  examplePuzzleWorldEnd,
  examplePuzzleWorldStart,
} from "@/constants/example-puzzle";

const TryItOut = () => {
  return (
    <div className={`flex w-11/12 flex-col items-center gap-2 p-4 `}>
      <div className="w-7/12">
        <h1
          className={`text-center text-lg font-bold md:text-2xl ${montserrat.className}`}
        >
          Who is Karel?
        </h1>
        <p className="text-base font-semibold md:text-lg">
          Karel is a friendly robot who follows some simple commands. Run the
          program with blocks or written code to try to solve your first Karel
          Puzzle!
        </p>
      </div>
      <div className="h-fit w-11/12 bg-card">
        <Puzzle
          worldDimensions={examplePuzzleWorldDimensions}
          puzzleImages={examplePuzzleWorldImages}
          startWorldInfo={examplePuzzleWorldStart}
          goalWorldInfo={examplePuzzleWorldEnd}
        />
      </div>
    </div>
  );
};

export default TryItOut;
