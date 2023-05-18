/*
  Warnings:

  - Added the required column `totalPrice` to the `order` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `size` on the `pizza` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ingredient" ALTER COLUMN "weight" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "pizza" DROP COLUMN "size",
ADD COLUMN     "size" INTEGER NOT NULL,
ALTER COLUMN "weight" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "drink" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "drink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_drinkToorder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_drinkTopizzeria" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_drinkToorder_AB_unique" ON "_drinkToorder"("A", "B");

-- CreateIndex
CREATE INDEX "_drinkToorder_B_index" ON "_drinkToorder"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_drinkTopizzeria_AB_unique" ON "_drinkTopizzeria"("A", "B");

-- CreateIndex
CREATE INDEX "_drinkTopizzeria_B_index" ON "_drinkTopizzeria"("B");

-- AddForeignKey
ALTER TABLE "_drinkToorder" ADD CONSTRAINT "_drinkToorder_A_fkey" FOREIGN KEY ("A") REFERENCES "drink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_drinkToorder" ADD CONSTRAINT "_drinkToorder_B_fkey" FOREIGN KEY ("B") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_drinkTopizzeria" ADD CONSTRAINT "_drinkTopizzeria_A_fkey" FOREIGN KEY ("A") REFERENCES "drink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_drinkTopizzeria" ADD CONSTRAINT "_drinkTopizzeria_B_fkey" FOREIGN KEY ("B") REFERENCES "pizzeria"("id") ON DELETE CASCADE ON UPDATE CASCADE;
