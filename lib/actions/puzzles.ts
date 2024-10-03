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
import { Prisma } from "@prisma/client";

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
  // Generate a random name if none is provided
  if (puzzleData.name === "") {
    puzzleData.name = uniqueUsernameGenerator(config);
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

const getOrderBy = (sortOption: SortOptionType) => {
  switch (sortOption) {
    case "diff-l-h":
      return {
        difficulty: "asc" as const,
      };
    case "diff-h-l":
      return {
        difficulty: "desc" as const,
      };
    case "rating-l-h":
      return {
        rating: "asc" as const,
      };
    case "rating-h-l":
      return {
        rating: "desc" as const,
      };
    default:
      return {
        createdAt: "desc" as const,
      };
  }
};

async function _getAllPuzzles(
  sortOption: SortOptionType,
  currentTag?: string,
  currentSearch?: string
) {
  const orderBy = getOrderBy(sortOption);

  const where: Prisma.PuzzleWhereInput = {
    ...(currentTag && {
      tags: {
        some: {
          name: {
            equals: currentTag,
            mode: "insensitive",
          },
        },
      },
    }),
    ...(currentSearch && {
      OR: [
        {
          tags: {
            some: {
              name: {
                contains: currentSearch,
                mode: "insensitive",
              },
            },
          },
        },
        {
          name: {
            contains: currentSearch,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: currentSearch,
            mode: "insensitive",
          },
        },
      ],
    }),
  };

  const puzzles = await db.puzzle.findMany({
    where: Object.keys(where).length ? where : undefined,
    include: {
      likedBy: true,
      tags: true,
    },
    orderBy,
  });

  return puzzles;
}

async function _getUserPuzzles(
  userId: string,
  currentTab: TabType,
  sortOption: SortOptionType
) {
  const orderBy = getOrderBy(sortOption);

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
        return JSON.stringify(solvedPuzzles);
      default:
        throw new Error("Invalid tab");
    }
  } catch (e: any) {
    throw new Error("Error getting puzzles: " + e.message);
  }
}

export async function likeOrUnlikePuzzle(
  userId: string,
  puzzleId: string,
  shouldLike: boolean
) {
  //check to see if the user already likes the puzzle

  try {
    // Check if the user already likes the puzzl

    if (!shouldLike) {
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
    }

    revalidateTag("puzzles");
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

export const getAllPuzzles = cache(_getAllPuzzles, ["get-all-puzzles"], {
  tags: ["puzzles"],
});

export const hasUserLiked = cache(_hasUserLiked, ["get-liked"], {
  tags: ["puzzles"],
});

export const getUserPuzzles = cache(_getUserPuzzles, ["get-user-puzzles"], {
  tags: ["puzzles"],
});

export const getPuzzle = cache(_getPuzzle, ["get-puzzle"], {
  tags: ["puzzles"],
});
