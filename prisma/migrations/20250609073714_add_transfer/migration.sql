-- AlterEnum
ALTER TYPE "CategoryType" ADD VALUE 'TRANSFER';

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "fromWalletId" TEXT;
