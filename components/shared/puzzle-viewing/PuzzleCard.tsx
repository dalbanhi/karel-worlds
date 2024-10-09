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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { headers } from "next/headers";
import { isMobile } from "@/lib/utils/isMobile";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getUserImage } from "@/lib/actions/users";
import { puzzleImagesType } from "@/types/karelWorld";

import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";

import { PuzzleWithMoreStuff } from "@/types/puzzleExtensions";
import CardButtons from "./CardButtons";
import ShowFullText from "./ShowFullText";
import { Description } from "@radix-ui/react-toast";

const StarRating: React.FC<{ rating: number; type: string }> = ({
  rating,
  type,
}) => {
  if (rating < 0) {
    return <span className="italic text-warning-dark">No {type} yet. </span>;
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
  const userAgent = headers().get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);
  // console.log("mobileCheck, should be rendering tooltip", mobileCheck);
  //check if the creator id of the puzzle is the same as the viewer id, if the viewer id is not the empty string
  const isCreator = viewerID !== "" ? viewerID === puzzleInfo.creatorId : false;

  const userImage = isCreator
    ? viewerImage
    : await getUserImage(puzzleInfo.creatorId);
  // const userImage = "";
  // console.log("puzzleInfo, ", puzzleInfo);
  console.log("isMobile", mobileCheck);

  const descriptionExists = puzzleInfo.description !== "";

  return (
    <Card className="flex max-h-fit min-h-80 w-64 flex-col">
      <CardHeader className=" grow items-center justify-center gap-2">
        <div className="flex size-full flex-col justify-start gap-1">
          <ShowFullText
            isMobile={mobileCheck}
            trigger={
              <CardTitle className="line-clamp-1 text-start">
                {puzzleInfo.name}
              </CardTitle>
            }
          >
            <CardTitle>{puzzleInfo.name}</CardTitle>
          </ShowFullText>
          <CardDescription className="flex gap-2">
            <span className="">
              Tag{puzzleInfo.tags.length === 1 ? "" : "s"}:{" "}
            </span>
            {puzzleInfo.tags.length <= 0 && (
              <span className="italic text-warning-dark">
                {" "}
                No tags to show.
              </span>
            )}
            {puzzleInfo.tags.length === 1 && (
              <span className="flex h-full flex-wrap gap-1">
                <Link
                  className={`capitalize text-ring underline underline-offset-4 hover:text-primary`}
                  href={`/explore?tag=${puzzleInfo.tags[0].name}`}
                >
                  {puzzleInfo.tags[0].name}
                </Link>
              </span>
            )}
            {puzzleInfo.tags.length > 1 && (
              <ShowFullText
                isMobile={mobileCheck}
                trigger={
                  <span className="flex h-full flex-wrap gap-1">
                    See tags...
                  </span>
                }
              >
                <span className="flex h-full flex-wrap gap-1">
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
              </ShowFullText>
            )}
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
          {!mobileCheck && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="underline">
                  Description
                </TooltipTrigger>
                <TooltipContent></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <ShowFullText isMobile={mobileCheck} trigger={"Description"}>
            <p
              className={`${!descriptionExists ? "italic text-warning-dark" : ""} `}
            >
              {descriptionExists
                ? puzzleInfo.description
                : "No description given by the puzzle maker."}
            </p>
          </ShowFullText>

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
      </CardFooter>
    </Card>
  );
};

export default PuzzleCard;
