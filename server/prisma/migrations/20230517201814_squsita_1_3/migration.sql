/*
  Warnings:

  - You are about to drop the column `status` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order" DROP COLUMN "status",
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;
