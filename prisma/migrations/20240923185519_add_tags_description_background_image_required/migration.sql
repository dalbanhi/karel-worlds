/*
  Warnings:

  - You are about to drop the column `tags` on the `puzzles` table. All the data in the column will be lost.
  - Added the required column `description` to the `puzzles` table without a default value. This is not possible if the table is not empty.
  - Made the column `backgroundImage` on table `puzzles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "puzzles" DROP COLUMN "tags",
ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "backgroundImage" SET NOT NULL;

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PuzzleTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PuzzleTags_AB_unique" ON "_PuzzleTags"("A", "B");

-- CreateIndex
CREATE INDEX "_PuzzleTags_B_index" ON "_PuzzleTags"("B");

-- AddForeignKey
ALTER TABLE "_PuzzleTags" ADD CONSTRAINT "_PuzzleTags_A_fkey" FOREIGN KEY ("A") REFERENCES "puzzles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PuzzleTags" ADD CONSTRAINT "_PuzzleTags_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
