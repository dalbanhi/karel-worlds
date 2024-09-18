import { Puzzle } from "@prisma/client";
import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PuzzleCardProps {
  puzzleInfo: Puzzle;
}

const PuzzleCard: React.FC<PuzzleCardProps> = ({ puzzleInfo }) => {
  const karelImage =
    puzzleInfo.karelImage !== ""
      ? puzzleInfo.karelImage
      : "/images/pixi-js/classic-karel.png";

  const beeperImg =
    puzzleInfo.beeperImage !== ""
      ? puzzleInfo.beeperImage
      : "/images/pixi-js/classic-beeper.png";

  return (
    <Card>
      <CardHeader>
        <CardTitle>{puzzleInfo.name}</CardTitle>
        <CardDescription>
          Tags:{" "}
          {puzzleInfo.tags.map((tag, index) => {
            const content =
              index === puzzleInfo.tags.length - 1 ? tag : `${tag}, `;
            return <span key={tag}>{content}</span>;
          })}
        </CardDescription>
        <Image src={karelImage} alt="Karel" width={20} height={20} />
      </CardHeader>
      <CardContent>
        <p>const first = useContext(second)</p>
      </CardContent>
      <CardFooter>footer</CardFooter>
    </Card>
  );
};

export default PuzzleCard;
