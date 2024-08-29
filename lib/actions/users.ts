"use server";
import { unstable_cache as cache, revalidateTag } from "next/cache";
import { onboardingSchema } from "../validators/onboarding.schema";
import { db } from "../db";

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
      },
    });
    return newUser;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create user");
  }
}

export const createUser = cache(_createUser, ["create-user"], {
  tags: ["user"],
});
