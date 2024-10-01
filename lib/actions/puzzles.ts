"use server";
import { unstable_cache as cache, revalidateTag } from "next/cache";
import { onboardingSchema } from "../validators/onboarding.schema";
import { db } from "../db";

async function _getPuzzle(id: string) {
  const puzzle = await db.puzzle.findUnique({
    where: {
      id,
    },
  });
  return puzzle;
}

export async function createPuzzle(puzzleData: any) {
  onboardingSchema.parse(puzzleData);
  try {
    return null;
    // const newPuzzle = await db.puzzle.create({
    //   data: {
    //     name: puzzleData.puzzleName,
    //     worldWidth: puzzleData.worldWidth,
    //     worldHeight: puzzleData.worldHeight,
    //     beeperImage: puzzleData.imagesObj.beeperImage,
    //     wallImage: puzzleData.imagesObj.beeperImage,
    //     karelImage: puzzleData.imagesObj.karelImage,
    //     backgroundImage: puzzleData.imagesObj.backgroundImage,
    //     startWorldInfo: puzzleData.startWorldInfo,
    //     goalWorldInfo: puzzleData.goalWorldInfo,
    //     description: puzzleData.description,
    //     creator: puzzleData.creator,
    //   },
    // });
    // return newPuzzle;
  } catch (error: any) {
    console.error(error);
    throw new Error(`Failed to create puzzle: ${error.message}`);
  }
}

export const getPuzzle = cache(_getPuzzle, ["get-puzzle"], {
  tags: ["puzzles"],
});
