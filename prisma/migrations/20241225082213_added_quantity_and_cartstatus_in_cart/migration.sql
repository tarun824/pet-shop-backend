/*
  Warnings:

  - Added the required column `cartStatus` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CartStatus" AS ENUM ('ordered', 'shipped', 'delivered');

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "cartStatus" "CartStatus" NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;
