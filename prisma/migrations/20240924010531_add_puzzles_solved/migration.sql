-- CreateTable
CREATE TABLE "_PuzzlesSolved" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PuzzlesSolved_AB_unique" ON "_PuzzlesSolved"("A", "B");

-- CreateIndex
CREATE INDEX "_PuzzlesSolved_B_index" ON "_PuzzlesSolved"("B");

-- AddForeignKey
ALTER TABLE "_PuzzlesSolved" ADD CONSTRAINT "_PuzzlesSolved_A_fkey" FOREIGN KEY ("A") REFERENCES "puzzles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PuzzlesSolved" ADD CONSTRAINT "_PuzzlesSolved_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
