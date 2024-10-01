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
  console.log("Creating puzzle with data:", puzzleData);
  // Generate a random name if none is provided
  if (puzzleData.name === "") {
    puzzleData.name = uniqueUsernameGenerator(config);
    console.log("Generated puzzle name:", puzzleData.puzzleName);
  }

  //for each tag, check if it exists in the database, if not, create it
  //then add the tag to the puzzle
  const tags = puzzleData.tags;
  const puzzleTags = [];
  for (const tag of tags) {
    const existingTag = await db.tags.findUnique({
      where: {
        name: tag,
      },
    });
    if (!existingTag) {
      const newTag = await db.tags.create({
        data: {
          name: tag,
        },
      });
      console.log("Created new tag:", newTag);
      puzzleTags.push(newTag);
    } else {
      puzzleTags.push(existingTag);
    }
  }

  //get the creator from the creator
  const creator = await db.user.findUnique({
    where: {
      id: puzzleData.creatorId,
    },
  });

  try {
    const newPuzzle = await db.puzzle.create({
      data: {
        name: puzzleData.name,
        worldWidth: puzzleData.worldWidth,
        worldHeight: puzzleData.worldHeight,
        beeperImage: puzzleData.beepersImage,
        wallImage: puzzleData.wallImage,
        karelImage: puzzleData.karelImage,
        backgroundImage: puzzleData.backgroundImage,
        startWorldInfo: puzzleData.startWorldInfo,
        goalWorldInfo: puzzleData.goalWorldInfo,
        description: puzzleData.description,
        creatorId: puzzleData.creator,
        rating: puzzleData.rating,
        difficulty: puzzleData.difficulty,
        creator: { connect: { id: creator?.id } },
        tags: {
          connect: puzzleTags.map((tag) => ({ id: tag.id })),
        },
      },
    });
    return newPuzzle;
  } catch (error: any) {
    console.error(error);
    throw new Error(`Failed to create puzzle: ${error.message}`);
  }
}

export const getPuzzle = cache(_getPuzzle, ["get-puzzle"], {
  tags: ["puzzles"],
});
