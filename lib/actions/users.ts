"use server";
import { unstable_cache as cache, revalidateTag } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";
import { onboardingSchema } from "../validators/onboarding.schema";
import { db } from "../db";

async function _createUser(data: any) {
  console.log("Creating user", data);
  onboardingSchema.parse(data);
  //   const clerkUser = await currentUser();
  // This function creates a user
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
}

export const createUser = cache(_createUser, ["create-user"], {
  tags: ["user"],
});

// export const getUser = cache(_getUser, ["get-user"], {
//     tags: ["user"],
//   });
