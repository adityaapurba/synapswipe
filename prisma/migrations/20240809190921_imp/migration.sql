/*
  Warnings:

  - Made the column `lastRevised` on table `CardProgress` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CardProgress" ADD COLUMN     "score" DOUBLE PRECISION NOT NULL DEFAULT 200,
ALTER COLUMN "lastRevised" SET NOT NULL,
ALTER COLUMN "lastRevised" SET DEFAULT CURRENT_TIMESTAMP;
