/*
  Warnings:

  - You are about to drop the column `overallGainLoss` on the `Strategy` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Strategy" DROP COLUMN "overallGainLoss",
ADD COLUMN     "gainLoss" DOUBLE PRECISION NOT NULL DEFAULT 0;
