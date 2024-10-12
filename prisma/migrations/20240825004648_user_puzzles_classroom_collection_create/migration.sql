-- CreateEnum
CREATE TYPE "Role" AS ENUM ('TEACHER', 'STUDENT');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "name" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "puzzles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tags" TEXT[],
    "worldWidth" INTEGER NOT NULL,
    "worldHeight" INTEGER NOT NULL,
    "hints" TEXT[],
    "karelImage" TEXT NOT NULL,
    "beeperImage" TEXT NOT NULL,
    "wallImage" TEXT NOT NULL,
    "backgroundImage" TEXT,
    "startWorldInfo" JSONB NOT NULL,
    "goalWorldInfo" JSONB NOT NULL,
    "creatorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "puzzles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collections" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classrooms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "classrooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PuzzlesLiked" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CollectionsBelongingTo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ClassroomsAttended" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ClassroomsBelongingTo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_clerkUserId_key" ON "users"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "creatorId" ON "puzzles"("creatorId");

-- CreateIndex
CREATE UNIQUE INDEX "_PuzzlesLiked_AB_unique" ON "_PuzzlesLiked"("A", "B");

-- CreateIndex
CREATE INDEX "_PuzzlesLiked_B_index" ON "_PuzzlesLiked"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CollectionsBelongingTo_AB_unique" ON "_CollectionsBelongingTo"("A", "B");

-- CreateIndex
CREATE INDEX "_CollectionsBelongingTo_B_index" ON "_CollectionsBelongingTo"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClassroomsAttended_AB_unique" ON "_ClassroomsAttended"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassroomsAttended_B_index" ON "_ClassroomsAttended"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClassroomsBelongingTo_AB_unique" ON "_ClassroomsBelongingTo"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassroomsBelongingTo_B_index" ON "_ClassroomsBelongingTo"("B");

-- AddForeignKey
ALTER TABLE "puzzles" ADD CONSTRAINT "puzzles_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collections" ADD CONSTRAINT "collections_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classrooms" ADD CONSTRAINT "classrooms_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PuzzlesLiked" ADD CONSTRAINT "_PuzzlesLiked_A_fkey" FOREIGN KEY ("A") REFERENCES "puzzles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PuzzlesLiked" ADD CONSTRAINT "_PuzzlesLiked_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionsBelongingTo" ADD CONSTRAINT "_CollectionsBelongingTo_A_fkey" FOREIGN KEY ("A") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionsBelongingTo" ADD CONSTRAINT "_CollectionsBelongingTo_B_fkey" FOREIGN KEY ("B") REFERENCES "puzzles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassroomsAttended" ADD CONSTRAINT "_ClassroomsAttended_A_fkey" FOREIGN KEY ("A") REFERENCES "classrooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassroomsAttended" ADD CONSTRAINT "_ClassroomsAttended_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassroomsBelongingTo" ADD CONSTRAINT "_ClassroomsBelongingTo_A_fkey" FOREIGN KEY ("A") REFERENCES "classrooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassroomsBelongingTo" ADD CONSTRAINT "_ClassroomsBelongingTo_B_fkey" FOREIGN KEY ("B") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
