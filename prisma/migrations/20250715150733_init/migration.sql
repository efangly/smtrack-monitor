-- CreateTable
CREATE TABLE "LegacyDevices" (
    "id" TEXT NOT NULL,
    "ward" TEXT NOT NULL,
    "wardName" TEXT,
    "hospital" TEXT NOT NULL,
    "hospitalName" TEXT,
    "sn" TEXT NOT NULL,
    "seq" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "lastInsert" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastTemp" DOUBLE PRECISION DEFAULT 0,
    "lastNotification" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastEvent" TEXT,
    "door" BOOLEAN NOT NULL DEFAULT false,
    "plug" BOOLEAN NOT NULL DEFAULT false,
    "ip" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LegacyDevices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LegacyEvents" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "probe" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LegacyEvents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SummaryEvents" (
    "id" TEXT NOT NULL,
    "log" INTEGER NOT NULL,
    "notification" INTEGER NOT NULL,
    "event" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SummaryEvents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LegacyDevices_sn_key" ON "LegacyDevices"("sn");

-- CreateIndex
CREATE UNIQUE INDEX "LegacyDevices_seq_key" ON "LegacyDevices"("seq");

-- CreateIndex
CREATE INDEX "LegacyEvents_deviceId_idx" ON "LegacyEvents"("deviceId");

-- AddForeignKey
ALTER TABLE "LegacyEvents" ADD CONSTRAINT "LegacyEvents_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "LegacyDevices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
