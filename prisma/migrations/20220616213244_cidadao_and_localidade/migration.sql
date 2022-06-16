-- CreateTable
CREATE TABLE "localidades" (
    "id" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "localidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CidadaoToLocalidade" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "localidades_latitude_key" ON "localidades"("latitude");

-- CreateIndex
CREATE UNIQUE INDEX "localidades_longitude_key" ON "localidades"("longitude");

-- CreateIndex
CREATE UNIQUE INDEX "_CidadaoToLocalidade_AB_unique" ON "_CidadaoToLocalidade"("A", "B");

-- CreateIndex
CREATE INDEX "_CidadaoToLocalidade_B_index" ON "_CidadaoToLocalidade"("B");

-- AddForeignKey
ALTER TABLE "_CidadaoToLocalidade" ADD CONSTRAINT "_CidadaoToLocalidade_A_fkey" FOREIGN KEY ("A") REFERENCES "cidadaos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CidadaoToLocalidade" ADD CONSTRAINT "_CidadaoToLocalidade_B_fkey" FOREIGN KEY ("B") REFERENCES "localidades"("id") ON DELETE CASCADE ON UPDATE CASCADE;
