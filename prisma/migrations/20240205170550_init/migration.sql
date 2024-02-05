-- CreateTable
CREATE TABLE "Webhooks" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "topic" TEXT NOT NULL,
    "order_uuid" TEXT NOT NULL,
    "order_state" TEXT NOT NULL,
    "event_time" TIMESTAMP(3) NOT NULL,
    "payload" TEXT NOT NULL,

    CONSTRAINT "Webhooks_pkey" PRIMARY KEY ("id")
);
