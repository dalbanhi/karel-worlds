import { PuzzleWithMoreStuff } from "@/types/puzzleExtensions";
import PuzzleCard from "./PuzzleCard";
import React from "react";

interface PuzzleListProps {
  puzzlesToShow: PuzzleWithMoreStuff[];
  viewerImage: string;
  viewerId: string | "";
}

const PuzzleList: React.FC<PuzzleListProps> = ({
  puzzlesToShow,
  viewerId,
  viewerImage,
}) => {
  return (
    <div className="flex grow flex-wrap justify-center gap-4 p-4">
      {puzzlesToShow.length > 0 &&
        puzzlesToShow.map((puzzle: PuzzleWithMoreStuff) => {
          return (
            <PuzzleCard
              key={puzzle.id}
              puzzleInfo={puzzle}
              viewerImage={viewerImage}
              viewerID={viewerId}
            />
          );
        })}
      {puzzlesToShow.length === 0 && <p>No puzzles to show</p>}
    </div>
  );
};

export default PuzzleList;
