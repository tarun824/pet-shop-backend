/*
  Warnings:

  - The primary key for the `Pet` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_petIds_fkey";

-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "petIds" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Pet_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_petIds_fkey" FOREIGN KEY ("petIds") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
