"use client";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useClerk } from "@clerk/nextjs";

interface CardButtonsProps {
  userID: string;
  puzzleID: string;
}

const CardButtons: React.FC<CardButtonsProps> = ({ userID, puzzleID }) => {
  const { toast } = useToast();
  const auth = useClerk();
  const [hasAlreadyLiked, setHasAlreadyLiked] = useState<boolean>();
  useEffect(() => {
    const getHasAlreadyLiked = async () => {
      const alreadyLiked = await hasUserLiked(userID, puzzleID);
      setHasAlreadyLiked(alreadyLiked);
    };
    getHasAlreadyLiked();
  });

  const isSignedIn = userID !== "";

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
          try {
            if (isSignedIn) {
              await likeOrUnlikePuzzle(userID, puzzleID, !hasAlreadyLiked);
              setHasAlreadyLiked((prev) => !prev); // Update the state after like/unlike
            } else {
              toast({
                variant: "warning",
                title: "Cannot like without signing in",
                description: `Sign in to like and share puzzles!`,
                action: (
                  <ToastAction
                    className={`text-ring ${buttonVariants({ variant: "outline" })}`}
                    onClick={() => {
                      auth.redirectToSignIn({
                        signInForceRedirectUrl: "/explore",
                      });
                    }}
                    altText="Sign In"
                  >
                    Sign In
                  </ToastAction>
                ),
              });
            }
          } catch (error) {
            console.error("Error liking/unliking puzzle:", error);
          } finally {
            setIsLiking(false);
          }
        }}
        type="button"
        aria-label="Like or Unlike the Puzzle"
        className="grow"
      >
        {hasAlreadyLiked ? <HeartFilledIcon /> : <HeartIcon />}
      </Button>
      <Button type="button" aria-label="Remix this puzzle" className="grow">
        <ShuffleIcon />
      </Button>
    </ButtonGroup>
  );
};

export default CardButtons;
