/*
  Warnings:

  - Added the required column `updated_at` to the `comentarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comentarios" ADD COLUMN     "create_at" TIMESTAMP(3) NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NULL;

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "create_at" TIMESTAMP(3) NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NULL;
