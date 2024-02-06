/*
  Warnings:

  - You are about to drop the column `order_external_ref_id` on the `Webhooks` table. All the data in the column will be lost.
  - Added the required column `external_reference_id` to the `Webhooks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Webhooks" DROP COLUMN "order_external_ref_id",
ADD COLUMN     "external_reference_id" TEXT NOT NULL;
