/*
  Warnings:

  - You are about to drop the column `idProduct` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `idProduct` to the `DetailTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `DetailTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `DetailTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DetailTransaction" DROP CONSTRAINT "DetailTransaction_idTransaction_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_idProduct_fkey";

-- AlterTable
ALTER TABLE "DetailTransaction" ADD COLUMN     "idProduct" INTEGER NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "subtotal" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "idProduct",
ADD COLUMN     "customerName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "DetailTransaction" ADD CONSTRAINT "DetailTransaction_idTransaction_fkey" FOREIGN KEY ("idTransaction") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailTransaction" ADD CONSTRAINT "DetailTransaction_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
