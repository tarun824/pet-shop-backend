/*
  Warnings:

  - Made the column `price` on table `Pet` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
CREATE SEQUENCE cart_id_seq;
ALTER TABLE "Cart" ALTER COLUMN "id" SET DEFAULT nextval('cart_id_seq');
ALTER SEQUENCE cart_id_seq OWNED BY "Cart"."id";

-- AlterTable
ALTER TABLE "Pet" ALTER COLUMN "price" SET NOT NULL;
