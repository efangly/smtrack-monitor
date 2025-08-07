/*
  Warnings:

  - You are about to drop the column `event` on the `SummaryEvents` table. All the data in the column will be lost.
  - Added the required column `date` to the `SummaryEvents` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tag` on the `SummaryEvents` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('LINE', 'SMTRACK');

-- AlterTable
ALTER TABLE "SummaryEvents" DROP COLUMN "event",
ADD COLUMN     "date" TEXT NOT NULL,
DROP COLUMN "tag",
ADD COLUMN     "tag" "EventType" NOT NULL;
