/*
  Warnings:

  - You are about to drop the column `gainLoss` on the `Strategy` table. All the data in the column will be lost.
  - You are about to drop the column `gainLoss` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Strategy" DROP COLUMN "gainLoss";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "gainLoss";
