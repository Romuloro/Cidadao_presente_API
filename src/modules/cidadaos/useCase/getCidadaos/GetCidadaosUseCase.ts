import { Cidadao } from "@prisma/client"
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client"
import { IdCidadaoDTO } from "../../dtos/IdCidadaoDTO";


export class GetCidadaoUseCase {
    async execute({ id }: IdCidadaoDTO): Promise<Cidadao> {
        //Cidadão já existe?
        const cidadaoAlreadyExists = await prisma.cidadao.findUnique({
            where: {
                id,
            }
        })

        if (!cidadaoAlreadyExists) {
            throw new AppError("Cidadão does not exists", 404);
        }

        return cidadaoAlreadyExists
    }
}