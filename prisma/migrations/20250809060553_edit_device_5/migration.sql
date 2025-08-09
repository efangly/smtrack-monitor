-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('SUMMARY', 'WARNING', 'CRITICAL');

-- CreateTable
CREATE TABLE "Reports" (
    "id" TEXT NOT NULL,
    "report" TEXT NOT NULL,
    "type" "ReportType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reports_pkey" PRIMARY KEY ("id")
);
