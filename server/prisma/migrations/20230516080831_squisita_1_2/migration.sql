/*
  Warnings:

  - You are about to drop the column `address` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `login` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `phonenumber` on the `client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "client" DROP COLUMN "address",
DROP COLUMN "login",
DROP COLUMN "phonenumber";
