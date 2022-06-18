import { Cidadao } from "@prisma/client"
import { prisma } from "../../../../prisma/client"

export class GetAllCidadaoUseCase {
    async execute(): Promise<Cidadao[]> {
        const cidadaos = await prisma.cidadao.findMany({
            include: {}
        })

        return cidadaos
    }
}