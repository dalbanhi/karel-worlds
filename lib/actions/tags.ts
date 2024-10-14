"use server";
import { unstable_cache as cache, revalidateTag } from "next/cache";
import { db } from "../db";

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
  // simulate getting the top
}

async function _searchTags(searchTerm: string) {
  if (searchTerm.length < 3) {
    return [];
  }

  const tags = await db.tags.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
  });
  return tags;
}

export const getTags = cache(_getTags, ["get-all-tags"], {
  tags: ["tags"],
});

export const searchTags = cache(_searchTags, ["search-tags"], {
  tags: ["tags"],
});
