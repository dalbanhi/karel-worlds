"use server";
import { unstable_cache as cache, revalidateTag } from "next/cache";

import { db } from "../db";
// Removed the import of `undefined` from `zod`

async function _getTags(top?: number) {
  const tags = await db.tags.findMany({
    take: top,
    orderBy: {
      puzzles: {
        _count: "desc",
      },
    },
    include: {
      _count: {
        select: {
          puzzles: true,
        },
      },
    },
  });
  return tags;
}

export const getTags = cache(_getTags, ["get-all-tags"], {
  tags: ["tags"],
});
