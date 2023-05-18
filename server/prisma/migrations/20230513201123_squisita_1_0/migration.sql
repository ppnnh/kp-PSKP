/*
  Warnings:

  - You are about to drop the `_drinkToorder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_orderTopizza` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_drinkToorder" DROP CONSTRAINT "_drinkToorder_A_fkey";

-- DropForeignKey
ALTER TABLE "_drinkToorder" DROP CONSTRAINT "_drinkToorder_B_fkey";

-- DropForeignKey
ALTER TABLE "_orderTopizza" DROP CONSTRAINT "_orderTopizza_A_fkey";

-- DropForeignKey
ALTER TABLE "_orderTopizza" DROP CONSTRAINT "_orderTopizza_B_fkey";

-- DropTable
DROP TABLE "_drinkToorder";

-- DropTable
DROP TABLE "_orderTopizza";

-- CreateTable
CREATE TABLE "itemDrink" (
    "id" SERIAL NOT NULL,
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "totalPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "itemDrink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itemPizza" (
    "id" SERIAL NOT NULL,
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "totalPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "itemPizza_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "itemDrink_B_index" ON "itemDrink"("B");

-- CreateIndex
CREATE UNIQUE INDEX "itemDrink_AB_unique" ON "itemDrink"("A", "B");

-- CreateIndex
CREATE INDEX "itemPizza_B_index" ON "itemPizza"("B");

-- CreateIndex
CREATE UNIQUE INDEX "itemPizza_AB_unique" ON "itemPizza"("A", "B");

-- AddForeignKey
ALTER TABLE "itemDrink" ADD CONSTRAINT "itemDrink_A_fkey" FOREIGN KEY ("A") REFERENCES "drink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itemDrink" ADD CONSTRAINT "itemDrink_B_fkey" FOREIGN KEY ("B") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itemPizza" ADD CONSTRAINT "itemPizza_A_fkey" FOREIGN KEY ("A") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itemPizza" ADD CONSTRAINT "itemPizza_B_fkey" FOREIGN KEY ("B") REFERENCES "pizza"("id") ON DELETE CASCADE ON UPDATE CASCADE;
