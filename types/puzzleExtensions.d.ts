import { Puzzle, User, Tags } from "@prisma/client";

export type PuzzleWithMoreStuff = Puzzle & {
  likedBy: User[];
  tags: Tags[];
};
