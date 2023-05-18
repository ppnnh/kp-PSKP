/*
  Warnings:

  - You are about to drop the `_ingredientToorder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ingredientToorder" DROP CONSTRAINT "_ingredientToorder_A_fkey";

-- DropForeignKey
ALTER TABLE "_ingredientToorder" DROP CONSTRAINT "_ingredientToorder_B_fkey";

-- DropTable
DROP TABLE "_ingredientToorder";
