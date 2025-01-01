/*
  Warnings:

  - You are about to drop the column `customerName` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `idProduct` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[transactionCode]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `transactionCode` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_idProduct_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "customerName",
DROP COLUMN "idProduct",
DROP COLUMN "quantity",
ADD COLUMN     "transactionCode" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;

-- DropEnum
DROP TYPE "TransactionStatus";

-- CreateTable
CREATE TABLE "DetailTransaction" (
    "id" SERIAL NOT NULL,
    "customerName" TEXT,
    "idTransaction" INTEGER NOT NULL,
    "idProduct" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "subtotal" INTEGER NOT NULL,
    "payment" INTEGER NOT NULL,
    "change" INTEGER NOT NULL,

    CONSTRAINT "DetailTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_transactionCode_key" ON "Transaction"("transactionCode");

-- AddForeignKey
ALTER TABLE "DetailTransaction" ADD CONSTRAINT "DetailTransaction_idTransaction_fkey" FOREIGN KEY ("idTransaction") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailTransaction" ADD CONSTRAINT "DetailTransaction_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
