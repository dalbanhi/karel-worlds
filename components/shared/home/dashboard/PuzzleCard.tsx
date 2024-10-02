import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getUserImage } from "@/lib/actions/users";
import { puzzleImagesType } from "@/types/karelWorld";

import {
  HeartIcon,
  PlayIcon,
  StarFilledIcon,
  StarIcon,
  ShuffleIcon,
} from "@radix-ui/react-icons";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { Button, buttonVariants } from "@/components/ui/button";
import { PuzzleWithMoreStuff } from "@/types/puzzleExtensions";
import CardButtons from "./CardButtons";

const StarRating: React.FC<{ rating: number; type: string }> = ({
  rating,
  type,
}) => {
  if (rating < 0) {
    return <span className="italic text-warning">No {type} yet. </span>;
  }
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        return star <= rating ? (
          <StarFilledIcon key={star} className="size-4 text-starYellow " />
        ) : (
          <StarIcon key={star} className=" size-4 text-border" />
        );
      })}
    </div>
  );
};

interface ImagesOverlayProps {
  images: puzzleImagesType;
}

const ImagesOverlay: React.FC<ImagesOverlayProps> = ({ images }) => {
  const karelImage =
    images.karel !== "" ? images.karel : "/images/pixi-js/classic-karel.png";

  const beeperImg =
    images.beeper !== "" ? images.beeper : "/images/pixi-js/classic-beeper.png";

  return (
    <div className="relative h-20 w-full overflow-hidden rounded-sm border-2">
      <div
        className={`absolute inset-0 bg-cover bg-center ${
          images.background ? "" : "bg-card"
        }`}
        style={
          images.background
            ? { backgroundImage: `url(${images.background})` }
            : {}
        }
      />
      <div className="absolute inset-0 flex items-center justify-center gap-2">
        <Image
          src={karelImage}
          alt={"Karel Image for this puzzle"}
          width={40}
          height={40}
        />
        <Image
          src={beeperImg}
          alt={"Beeper Image for this puzzle"}
          width={40}
          height={40}
        />
      </div>
    </div>
  );
};

interface PuzzleCardProps {
  puzzleInfo: PuzzleWithMoreStuff;
  viewerImage: string;
  viewerID: string;
}

const PuzzleCard: React.FC<PuzzleCardProps> = async ({
  puzzleInfo,
  viewerImage,
  viewerID,
}) => {
  //check if the creator id of the puzzle is the same as the viewer id
  const isCreator = viewerID === puzzleInfo.creatorId;

  const userImage = isCreator
    ? viewerImage
    : await getUserImage(puzzleInfo.creatorId);
  // const userImage = "";
  // console.log("puzzleInfo, ", puzzleInfo);

  return (
    <Card className="max-w-64">
      <CardHeader className=" items-center justify-center gap-2">
        <div className="flex flex-col gap-1">
          <CardTitle>{puzzleInfo.name}</CardTitle>
          <CardDescription className="flex gap-2">
            {puzzleInfo.tags.length > 0 && (
              <span className="">
                Tag{puzzleInfo.tags.length === 1 ? "" : "s"}:{" "}
              </span>
            )}
            <span className="flex flex-wrap gap-1">
              {puzzleInfo.tags.map((tag, index) => {
                const content =
                  index === puzzleInfo.tags.length - 1
                    ? tag.name
                    : `${tag.name}, `;
                return (
                  <Link
                    className={`capitalize text-ring underline underline-offset-4 hover:text-primary`}
                    href={`/explore?tag=${tag.name}`}
                    key={tag.id}
                  >
                    {content}
                  </Link>
                );
              })}
            </span>
          </CardDescription>
        </div>
        <Avatar>
          <AvatarImage src={userImage ?? undefined} alt="The user's image" />
          <AvatarFallback>??</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-2">
        <ImagesOverlay
          images={{
            background: puzzleInfo.backgroundImage ?? "",
            karel: puzzleInfo.karelImage,
            beeper: puzzleInfo.beeperImage,
            wall: puzzleInfo.wallImage,
          }}
        />
        <div className="flex w-full flex-col justify-start gap-1">
          <p className="text-sm">
            <span className="font-semibold">World Dimensions:</span>{" "}
            {puzzleInfo.worldWidth}x{puzzleInfo.worldHeight}
          </p>
          <div className="flex items-center justify-start gap-2 text-sm ">
            <span className="font-semibold">Rating:</span>{" "}
            <StarRating rating={puzzleInfo.rating} type="rating" />
          </div>
          <div className="flex items-center justify-start gap-2 text-sm ">
            <span className="font-semibold">Difficulty:</span>{" "}
            <StarRating rating={puzzleInfo.difficulty} type="difficulty" />
          </div>
          <div className="flex items-center justify-start gap-2 text-sm ">
            <span className="font-semibold">Likes:</span>{" "}
            {puzzleInfo.likedBy.length}
          </div>
        </div>
      </CardContent>
      <CardFooter className="w-full">
        <CardButtons userID={viewerID} puzzleID={puzzleInfo.id} />
        {/* <ButtonGroup className="w-full" areCardButtons={true}>
          <Link
            href={`/puzzle/${puzzleInfo.id}`}
            aria-label="Solve the Puzzle"
            className={`grow ${buttonVariants({ variant: "default" })}`}
          >
            <PlayIcon />
          </Link>
          <Button aria-label="Like or Unlike the Puzzle" className="grow">
            <HeartIcon />
          </Button>
          <Button aria-label="Remix this puzzle" className="grow">
            <ShuffleIcon />
          </Button>
        </ButtonGroup> */}
      </CardFooter>
    </Card>
  );
};

export default PuzzleCard;
