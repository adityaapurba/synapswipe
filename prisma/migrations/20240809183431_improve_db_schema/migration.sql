/*
  Warnings:

  - You are about to drop the column `correctRevisions` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `lastReviewed` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `totalRevisions` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `consecutiveCorrect` on the `CardProgress` table. All the data in the column will be lost.
  - You are about to drop the column `correctRevisions` on the `CardProgress` table. All the data in the column will be lost.
  - You are about to drop the column `easeFactor` on the `CardProgress` table. All the data in the column will be lost.
  - You are about to drop the column `errorCount` on the `CardProgress` table. All the data in the column will be lost.
  - You are about to drop the column `interval` on the `CardProgress` table. All the data in the column will be lost.
  - You are about to drop the column `lastReviewed` on the `CardProgress` table. All the data in the column will be lost.
  - You are about to drop the column `longestStreak` on the `CardProgress` table. All the data in the column will be lost.
  - You are about to drop the column `nextReview` on the `CardProgress` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `CardProgress` table. All the data in the column will be lost.
  - You are about to drop the column `correctRevisions` on the `Deck` table. All the data in the column will be lost.
  - You are about to drop the column `lastReviewed` on the `Deck` table. All the data in the column will be lost.
  - You are about to drop the column `totalRevisions` on the `Deck` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cardId]` on the table `CardProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CardProgress" DROP CONSTRAINT "CardProgress_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_createdById_fkey";

-- DropIndex
DROP INDEX "CardProgress_userId_cardId_key";

-- DropIndex
DROP INDEX "CardProgress_userId_idx";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "correctRevisions",
DROP COLUMN "lastReviewed",
DROP COLUMN "totalRevisions";

-- AlterTable
ALTER TABLE "CardProgress" DROP COLUMN "consecutiveCorrect",
DROP COLUMN "correctRevisions",
DROP COLUMN "easeFactor",
DROP COLUMN "errorCount",
DROP COLUMN "interval",
DROP COLUMN "lastReviewed",
DROP COLUMN "longestStreak",
DROP COLUMN "nextReview",
DROP COLUMN "userId",
ADD COLUMN     "consecutiveCorrectRevisions" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "difficulty" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "importance" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "lastRevised" TIMESTAMP(3),
ADD COLUMN     "totalCorrectRevisions" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalIncorrectRevisions" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Deck" DROP COLUMN "correctRevisions",
DROP COLUMN "lastReviewed",
DROP COLUMN "totalRevisions";

-- DropTable
DROP TABLE "Post";

-- CreateIndex
CREATE UNIQUE INDEX "CardProgress_cardId_key" ON "CardProgress"("cardId");
