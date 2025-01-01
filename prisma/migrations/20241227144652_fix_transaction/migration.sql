/*
  Warnings:

  - You are about to drop the column `change` on the `DetailTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `DetailTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `idProduct` on the `DetailTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `payment` on the `DetailTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `DetailTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `subtotal` on the `DetailTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `idProduct` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DetailTransaction" DROP CONSTRAINT "DetailTransaction_idProduct_fkey";

-- DropForeignKey
ALTER TABLE "DetailTransaction" DROP CONSTRAINT "DetailTransaction_idTransaction_fkey";

-- AlterTable
ALTER TABLE "DetailTransaction" DROP COLUMN "change",
DROP COLUMN "customerName",
DROP COLUMN "idProduct",
DROP COLUMN "payment",
DROP COLUMN "quantity",
DROP COLUMN "subtotal";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "status",
DROP COLUMN "total",
DROP COLUMN "updatedAt",
ADD COLUMN     "change" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "idProduct" INTEGER NOT NULL,
ADD COLUMN     "payment" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalPrice" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailTransaction" ADD CONSTRAINT "DetailTransaction_idTransaction_fkey" FOREIGN KEY ("idTransaction") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
