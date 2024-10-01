"use server";
import { unstable_cache as cache, revalidateTag } from "next/cache";
import { puzzleSchema } from "../validators/puzzle.schema";
import { db } from "../db";

import {
  uniqueUsernameGenerator,
  Config,
  adjectives,
  nouns,
} from "unique-username-generator";

const config: Config = {
  dictionaries: [adjectives, nouns, nouns],
  style: "lowerCase",
  separator: "_",
  randomDigits: 3,
  length: 25,
};

async function _getPuzzle(id: string) {
  const puzzle = await db.puzzle.findUnique({
    where: {
      id,
    },
  });
  return puzzle;
}

export async function createPuzzle(puzzleData: any) {
  puzzleSchema.parse(puzzleData);

  // Generate a random name if none is provided
  if (puzzleData.puzzleName === "") {
    puzzleData.puzzleName = uniqueUsernameGenerator(config);
  }
  try {
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
    //     rating: puzzleData.rating,
    //     difficulty: puzzleData.difficulty,
    //   },
    // });
    // return newPuzzle;
    return "newPuzzle";
  } catch (error: any) {
    console.error(error);
    throw new Error(`Failed to create puzzle: ${error.message}`);
  }
}

export const getPuzzle = cache(_getPuzzle, ["get-puzzle"], {
  tags: ["puzzles"],
});
