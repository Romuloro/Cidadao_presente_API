-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Resolvidos', 'Pendente');

-- CreateEnum
CREATE TYPE "Tipo" AS ENUM ('Infraestrutura', 'Saude', 'Seguranca', 'Poluicao');

-- CreateEnum
CREATE TYPE "ComentarioTipo" AS ENUM ('Positivo', 'Negativo');

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "anonimo" BOOLEAN NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "localidade_id" TEXT NOT NULL,
    "cidadao_id" TEXT NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "problemas" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipo" "Tipo" NOT NULL,

    CONSTRAINT "problemas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comentarios" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipo" "ComentarioTipo" NOT NULL,
    "cidadao_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "comentarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostToProblema" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "problemas_titulo_key" ON "problemas"("titulo");

-- CreateIndex
CREATE UNIQUE INDEX "_PostToProblema_AB_unique" ON "_PostToProblema"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToProblema_B_index" ON "_PostToProblema"("B");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_cidadao_id_fkey" FOREIGN KEY ("cidadao_id") REFERENCES "cidadaos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_localidade_id_fkey" FOREIGN KEY ("localidade_id") REFERENCES "localidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_cidadao_id_fkey" FOREIGN KEY ("cidadao_id") REFERENCES "cidadaos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToProblema" ADD CONSTRAINT "_PostToProblema_A_fkey" FOREIGN KEY ("A") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToProblema" ADD CONSTRAINT "_PostToProblema_B_fkey" FOREIGN KEY ("B") REFERENCES "problemas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
