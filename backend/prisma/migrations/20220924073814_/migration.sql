/*
  Warnings:

  - The primary key for the `PricePoint` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PricePoint` table. All the data in the column will be lost.
  - Changed the type of `dateTime` on the `PricePoint` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "PricePoint" DROP CONSTRAINT "PricePoint_pkey",
DROP COLUMN "id",
DROP COLUMN "dateTime",
ADD COLUMN     "dateTime" DOUBLE PRECISION NOT NULL,
ADD CONSTRAINT "PricePoint_pkey" PRIMARY KEY ("dateTime", "stockId");
