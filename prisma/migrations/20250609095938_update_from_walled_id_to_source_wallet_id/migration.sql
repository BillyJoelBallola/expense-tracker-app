/*
  Warnings:

  - You are about to drop the column `fromWalletId` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "fromWalletId",
ADD COLUMN     "sourceWalletId" TEXT;
