"use server";
import { unstable_cache as cache, revalidateTag } from "next/cache";
import { Tags } from "@prisma/client";
import { db } from "../db";
// Removed the import of `undefined` from `zod`

const fakeTags: { name: string; id: string; _count: number }[] = [
  { name: "tag1", id: "1", _count: 5 },
  { name: "tag2", id: "2", _count: 6 },
  { name: "tag3", id: "3", _count: 7 },
  { name: "tag4", id: "4", _count: 8 },
  { name: "tag5", id: "5", _count: 1 },
  { name: "tag6", id: "6", _count: 2 },
  { name: "tag7", id: "7", _count: 6 },
  { name: "tag8", id: "8", _count: 8 },
  { name: "tag9", id: "9", _count: 9 },
  { name: "tag10", id: "10", _count: 10 },
  { name: "Texas", id: "123", _count: 1 },
];

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

  //sort the fake tags by the count
  fakeTags.sort((a, b) => b._count - a._count);

  await new Promise((resolve) => setTimeout(resolve, 500));

  return top ? fakeTags.slice(0, top) : fakeTags;
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
  // const tags: Tags[] = fakeTags;

  //filter the tags that contain the serach term
  const filteredTags = fakeTags.filter((tag) =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //set timeout to simulate the delay of the server
  await new Promise((resolve) => setTimeout(resolve, 500));
  return filteredTags;
}

export const getTags = cache(_getTags, ["get-all-tags"], {
  tags: ["tags"],
});

export const searchTags = cache(_searchTags, ["search-tags"], {
  tags: ["tags"],
});
