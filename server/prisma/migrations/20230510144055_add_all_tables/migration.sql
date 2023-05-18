-- CreateTable
CREATE TABLE "client" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phonenumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "clientId" INTEGER,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pizza" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "pizza_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pizzeria" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "pizzeria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ingredientToorder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ingredientTopizza" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_orderTopizza" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_pizzaTopizzeria" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "client_email_key" ON "client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ingredientToorder_AB_unique" ON "_ingredientToorder"("A", "B");

-- CreateIndex
CREATE INDEX "_ingredientToorder_B_index" ON "_ingredientToorder"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ingredientTopizza_AB_unique" ON "_ingredientTopizza"("A", "B");

-- CreateIndex
CREATE INDEX "_ingredientTopizza_B_index" ON "_ingredientTopizza"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_orderTopizza_AB_unique" ON "_orderTopizza"("A", "B");

-- CreateIndex
CREATE INDEX "_orderTopizza_B_index" ON "_orderTopizza"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_pizzaTopizzeria_AB_unique" ON "_pizzaTopizzeria"("A", "B");

-- CreateIndex
CREATE INDEX "_pizzaTopizzeria_B_index" ON "_pizzaTopizzeria"("B");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ingredientToorder" ADD CONSTRAINT "_ingredientToorder_A_fkey" FOREIGN KEY ("A") REFERENCES "ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ingredientToorder" ADD CONSTRAINT "_ingredientToorder_B_fkey" FOREIGN KEY ("B") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ingredientTopizza" ADD CONSTRAINT "_ingredientTopizza_A_fkey" FOREIGN KEY ("A") REFERENCES "ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ingredientTopizza" ADD CONSTRAINT "_ingredientTopizza_B_fkey" FOREIGN KEY ("B") REFERENCES "pizza"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_orderTopizza" ADD CONSTRAINT "_orderTopizza_A_fkey" FOREIGN KEY ("A") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_orderTopizza" ADD CONSTRAINT "_orderTopizza_B_fkey" FOREIGN KEY ("B") REFERENCES "pizza"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_pizzaTopizzeria" ADD CONSTRAINT "_pizzaTopizzeria_A_fkey" FOREIGN KEY ("A") REFERENCES "pizza"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_pizzaTopizzeria" ADD CONSTRAINT "_pizzaTopizzeria_B_fkey" FOREIGN KEY ("B") REFERENCES "pizzeria"("id") ON DELETE CASCADE ON UPDATE CASCADE;
