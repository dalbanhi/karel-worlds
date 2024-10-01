"use server";
import { unstable_cache as cache, revalidateTag } from "next/cache";

import { db } from "../db";

async function _getAllTags() {
  // get all of the tags from the database, paginated
  const tags = await db.tags.findMany();
  return tags;
}

export const getAllTags = cache(_getAllTags, ["get-all-tags"], {
  tags: ["tags"],
});
