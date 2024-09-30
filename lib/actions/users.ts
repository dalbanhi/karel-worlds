"use server";
import { unstable_cache as cache, revalidateTag } from "next/cache";
import { onboardingSchema } from "../validators/onboarding.schema";
import { db } from "../db";

export async function checkUsername(username: string): Promise<boolean> {
  // This function checks if a username is already taken
  const existingUser = await db.user.findUnique({
    where: {
      username,
    },
  });
  return !!existingUser;
}

async function _createUser(data: any) {
  onboardingSchema.parse(data);
  // This function creates a user
  try {
    const newUser = await db.user.create({
      data: {
        clerkUserId: data.clerkUserId,
        name: data.name,
        imageUrl: data.imageUrl,
        email: data.email,
        role: data.role,
        onboardingComplete: true,
        username: data.username,
      },
    });
    return newUser;
  } catch (error: any) {
    console.error(error);
    // return { error: error.message };
    throw new Error(`Failed to create user: ${error.message}`);
  }
}

export async function getUserImage(userId: string) {
  // This function gets the user's image
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user?.imageUrl;
}

async function getPuzzles(userId: string, options?: any) {
  //get puzzles created by the user
  const puzzles = await db.puzzle.findMany({
    where: {
      creatorId: userId,
    },
  });
  return puzzles;
}

export const createUser = cache(_createUser, ["create-user"], {
  tags: ["user"],
});

export const getUserPuzzles = cache(getPuzzles, ["get-user-puzzles"], {
  tags: ["puzzle"],
});
