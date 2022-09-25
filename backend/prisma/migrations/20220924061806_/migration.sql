/*
  Warnings:

  - You are about to drop the column `percentage` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `percent` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "percentage",
ADD COLUMN     "percent" INTEGER NOT NULL;
