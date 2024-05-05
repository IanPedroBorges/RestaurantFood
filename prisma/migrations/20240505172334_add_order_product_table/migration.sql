/*
  Warnings:

  - You are about to drop the column `subTotalPrice` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `totalDiscount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `_OrderToProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subtotalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalDiscounts` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_OrderToProduct" DROP CONSTRAINT "_OrderToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToProduct" DROP CONSTRAINT "_OrderToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "subTotalPrice",
DROP COLUMN "totalDiscount",
ADD COLUMN     "subtotalPrice" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "totalDiscounts" DECIMAL(10,2) NOT NULL;

-- DropTable
DROP TABLE "_OrderToProduct";

-- CreateTable
CREATE TABLE "OrderProduct" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "OrderProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
