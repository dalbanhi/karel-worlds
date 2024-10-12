"use client";
import React from "react";

interface PuzzleActionButtonsProps {
  isCreator: boolean;
  hasSolved: boolean;
}

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil1Icon, StarFilledIcon } from "@radix-ui/react-icons";
import { toast } from "@/hooks/use-toast";

const PuzzleActionButtons: React.FC<PuzzleActionButtonsProps> = ({
  isCreator,
  hasSolved,
}) => {
  return (
    <div className="flex w-full justify-between">
      {isCreator && (
        <Button
          onClick={() => {
            toast({
              variant: "warning",
              title: "Coming soon",
              description: "Puzzle editing is coming soon!",
            });
          }}
          type="button"
          variant="default"
          className="flex items-center gap-1"
        >
          {" "}
          Edit <Pencil1Icon />
        </Button>
      )}
      {hasSolved && (
        <Button
          onClick={() => {
            toast({
              variant: "warning",
              title: "Coming soon",
              description: "Puzzle re-rating is coming soon!",
            });
          }}
          type="button"
          variant="default"
          className="flex items-center gap-1"
        >
          {" "}
          Rate <StarFilledIcon />
        </Button>
      )}
    </div>
  );
};

export default PuzzleActionButtons;
