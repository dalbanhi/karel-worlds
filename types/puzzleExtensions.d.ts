import { Puzzle, User, Tags } from "@prisma/client";

export type PuzzleWithLikedBy = Puzzle & {
  likedBy: User[];
  tags: Tags[];
};
