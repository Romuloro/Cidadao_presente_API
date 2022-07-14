/*
  Warnings:

  - Added the required column `role` to the `cidadaos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('Admin', 'Cidadao', 'Organizadores');

-- AlterTable
ALTER TABLE "cidadaos" ADD COLUMN "role" "Roles" NOT NULL;
