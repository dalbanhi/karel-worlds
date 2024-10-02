import { Puzzle, User } from "@prisma/client";

export type PuzzleWithLikedBy = Puzzle & {
  likedBy: User[];
};
