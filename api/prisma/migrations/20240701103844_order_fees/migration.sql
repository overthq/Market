-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "serviceFee" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "transactionFee" INTEGER NOT NULL DEFAULT 0;
