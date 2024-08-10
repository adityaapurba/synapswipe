-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_deckId_fkey";

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "correctRevisions" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastReviewed" TIMESTAMP(3),
ADD COLUMN     "totalRevisions" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "CardProgress" ADD COLUMN     "correctRevisions" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "longestStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalRevisions" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Deck" ADD COLUMN     "correctRevisions" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastReviewed" TIMESTAMP(3),
ADD COLUMN     "totalRevisions" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Card_deckId_idx" ON "Card"("deckId");

-- CreateIndex
CREATE INDEX "CardProgress_userId_idx" ON "CardProgress"("userId");

-- CreateIndex
CREATE INDEX "CardProgress_cardId_idx" ON "CardProgress"("cardId");

-- CreateIndex
CREATE INDEX "Deck_userId_idx" ON "Deck"("userId");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;
