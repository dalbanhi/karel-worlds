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
import { SortOptionType, TabType } from "@/types/puzzleDB";

const config: Config = {
  dictionaries: [adjectives, nouns, nouns],
  style: "lowerCase",
  separator: "_",
  randomDigits: 3,
  length: 25,
};

async function _getPuzzle(id: string) {
  try {
    const puzzle = await db.puzzle.findUnique({
      where: {
        id,
      },
    });
    return puzzle;
  } catch {
    throw new Error("Error getting puzzle");
  }
}

export async function createPuzzle(puzzleData: any) {
  puzzleSchema.parse(puzzleData);
  // console.log("Creating puzzle with data:", puzzleData);
  // Generate a random name if none is provided
  if (puzzleData.name === "") {
    puzzleData.name = uniqueUsernameGenerator(config);
    // console.log("Generated puzzle name:", puzzleData.puzzleName);
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
      // console.log("Created new tag:", newTag);
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

async function _getUserPuzzles(
  userId: string,
  currentTab: TabType,
  sortOption: SortOptionType
) {
  let orderBy;
  switch (sortOption) {
    case "diff-l-h":
      orderBy = {
        difficulty: "asc" as const,
      };
      break;
    case "diff-h-l":
      orderBy = {
        difficulty: "desc" as const,
      };
      break;
    case "rating-l-h":
      orderBy = {
        rating: "asc" as const,
      };
      break;
    case "rating-h-l":
      orderBy = {
        rating: "desc" as const,
      };
      break;
    default:
      orderBy = {
        createdAt: "desc" as const,
      };
  }

  //get puzzles created by the user
  try {
    switch (currentTab) {
      case "my-puzzles":
        const puzzles = await db.puzzle.findMany({
          where: {
            creatorId: userId,
          },
          include: {
            likedBy: true,
            tags: true,
          },
          orderBy,
        });
        // console.log("Puzzles:", puzzles);
        return JSON.stringify(puzzles);
      case "liked-puzzles":
        const likedPuzzles = await db.puzzle.findMany({
          where: {
            likedBy: {
              some: {
                id: userId,
              },
            },
          },
          include: {
            likedBy: true,
            tags: true,
          },
          orderBy,
        });
        // console.log("Liked puzzles:", likedPuzzles);
        return JSON.stringify(likedPuzzles);
      case "solved-puzzles":
        const solvedPuzzles = await db.puzzle.findMany({
          where: {
            solvedBy: {
              some: {
                id: userId,
              },
            },
          },
          include: {
            likedBy: true,
            tags: true,
          },
          orderBy,
        });
        // console.log("Solved puzzles:", solvedPuzzles);
        return JSON.stringify(solvedPuzzles);
      default:
        throw new Error("Invalid tab");
    }
  } catch (e: any) {
    throw new Error("Error getting puzzles: " + e.message);
  }
}

async function _likeOrUnlikePuzzle(
  userId: string,
  puzzleId: string,
  shouldLike: boolean
) {
  console.log(`${userId} is liking ${puzzleId}`);

  //check to see if the user already likes the puzzle

  try {
    // Check if the user already likes the puzzl

    if (shouldLike) {
      // If the user already likes the puzzle, unlike it
      await db.puzzle.update({
        where: {
          id: puzzleId,
        },
        data: {
          likedBy: {
            disconnect: {
              id: userId,
            },
          },
        },
      });
      console.log(`User ${userId} unliked puzzle ${puzzleId}`);
    } else {
      // If the user does not already like the puzzle, like it
      await db.puzzle.update({
        where: {
          id: puzzleId,
        },
        data: {
          likedBy: {
            connect: {
              id: userId,
            },
          },
        },
      });
      console.log(`User ${userId} liked puzzle ${puzzleId}`);
    }
  } catch (e: any) {
    console.log(e);
    throw new Error("Error liking puzzle.");
  }
}

async function _hasUserLiked(userId: string, puzzleId: string) {
  try {
    const existingLike = await db.puzzle.findFirst({
      where: {
        id: puzzleId,
        likedBy: {
          some: {
            id: userId,
          },
        },
      },
    });

    return existingLike !== null;
  } catch {
    throw new Error("Error getting if the user has already liked the puzzle");
  }
}

export const hasUserLiked = cache(_hasUserLiked, ["get-liked"], {
  tags: ["puzzles"],
});

export const likeOrUnlikePuzzle = cache(_likeOrUnlikePuzzle, ["like-puzzle"], {
  tags: ["puzzles"],
});

export const getUserPuzzles = cache(_getUserPuzzles, ["get-user-puzzles"], {
  tags: ["puzzles"],
});

export const getPuzzle = cache(_getPuzzle, ["get-puzzle"], {
  tags: ["puzzles"],
});
