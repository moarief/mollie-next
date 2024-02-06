/*
  Warnings:

  - Added the required column `order_external_ref_id` to the `Webhooks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Webhooks" ADD COLUMN     "order_external_ref_id" TEXT NOT NULL;
