-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('Masculino', 'Feminino', 'Nao_Declarado');

-- CreateTable
CREATE TABLE "cidadaos" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "celular" INTEGER NOT NULL,
    "senha" TEXT NOT NULL,
    "nick_name" TEXT NOT NULL,
    "sexo" "Sexo" NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cidadaos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cidadaos_email_key" ON "cidadaos"("email");

-- CreateIndex
CREATE UNIQUE INDEX "cidadaos_celular_key" ON "cidadaos"("celular");

-- CreateIndex
CREATE UNIQUE INDEX "cidadaos_nick_name_key" ON "cidadaos"("nick_name");
