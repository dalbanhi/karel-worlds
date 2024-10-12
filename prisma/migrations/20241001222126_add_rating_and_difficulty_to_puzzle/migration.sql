/*
  Warnings:

  - Added the required column `difficulty` to the `puzzles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `puzzles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "puzzles" ADD COLUMN     "difficulty" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL;
