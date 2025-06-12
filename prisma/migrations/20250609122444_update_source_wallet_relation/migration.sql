-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_sourceWalletId_fkey" FOREIGN KEY ("sourceWalletId") REFERENCES "Wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
