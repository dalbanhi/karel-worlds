"use client";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import {
  PlayIcon,
  HeartIcon,
  ShuffleIcon,
  HeartFilledIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { likeOrUnlikePuzzle, hasUserLiked } from "@/lib/actions/puzzles";

interface CardButtonsProps {
  userID: string;
  puzzleID: string;
}

const CardButtons: React.FC<CardButtonsProps> = ({ userID, puzzleID }) => {
  const [hasAlreadyLiked, setHasAlreadyLiked] = useState<boolean>();
  useEffect(() => {
    const getHasAlreadyLiked = async () => {
      const alreadyLiked = await hasUserLiked(userID, puzzleID);
      setHasAlreadyLiked(alreadyLiked);
    };
    getHasAlreadyLiked();
  });

  const [isLiking, setIsLiking] = useState(false);
  const router = useRouter();
  return (
    <ButtonGroup className="w-full" areCardButtons={true}>
      <Button
        onClick={() => {
          router.push(`/puzzle/${puzzleID}`);
        }}
        type="button"
        aria-label="Solve the Puzzle"
        className={`grow`}
      >
        <PlayIcon />
      </Button>
      <Button
        disabled={isLiking}
        onClick={async () => {
          setIsLiking(true);
          await likeOrUnlikePuzzle(userID, puzzleID, !hasAlreadyLiked);
          setIsLiking(false);
        }}
        type="button"
        aria-label="Like or Unlike the Puzzle"
        className="grow"
      >
        <HeartIcon />
      </Button>
      <Button type="button" aria-label="Remix this puzzle" className="grow">
        <ShuffleIcon />
      </Button>
    </ButtonGroup>
  );
};

export default CardButtons;
