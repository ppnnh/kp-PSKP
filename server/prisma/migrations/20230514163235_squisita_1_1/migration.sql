/*
  Warnings:

  - Added the required column `image` to the `pizzeria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pizzeria" ADD COLUMN     "image" TEXT NOT NULL;
