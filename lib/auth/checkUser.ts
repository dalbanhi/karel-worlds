import { currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

export const getCurrentUser = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const dbUser = await db.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
  });

  if (dbUser) {
    return dbUser;
  }

  return null;
};
