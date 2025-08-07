-- AlterTable
ALTER TABLE "LegacyDevices" ALTER COLUMN "lastInsert" DROP DEFAULT,
ALTER COLUMN "lastTemp" DROP DEFAULT,
ALTER COLUMN "lastNotification" DROP DEFAULT;
