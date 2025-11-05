/*
  Warnings:

  - You are about to drop the column `amount` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `fee` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `priceUsd` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `assetQuantity` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `solde_actuel` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "amount",
DROP COLUMN "fee",
DROP COLUMN "priceUsd",
DROP COLUMN "status",
ADD COLUMN     "assetQuantity" DECIMAL(20,10) NOT NULL,
ADD COLUMN     "solde_actuel" DECIMAL(20,10) NOT NULL,
ADD COLUMN     "totalAmountEUR" DECIMAL(20,10);
