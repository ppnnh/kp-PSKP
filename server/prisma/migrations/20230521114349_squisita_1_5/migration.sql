-- AlterTable
ALTER TABLE "order" ADD COLUMN     "pizzeriaId" INTEGER,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Not ready';

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_pizzeriaId_fkey" FOREIGN KEY ("pizzeriaId") REFERENCES "pizzeria"("id") ON DELETE SET NULL ON UPDATE CASCADE;
