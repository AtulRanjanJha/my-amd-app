-- CreateTable
CREATE TABLE "CallLog" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "strategy" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CallLog_pkey" PRIMARY KEY ("id")
);
