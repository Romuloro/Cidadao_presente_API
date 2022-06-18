import { Cidadao } from "@prisma/client"
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client"
import { CreateCidadaoDTO } from "../../dtos/CreateCidadaoDTO"

export class CreateCidadaoUseCase {
    async execute({ name, email, celular, senha, nick_name, sexo }: CreateCidadaoDTO): Promise<Cidadao> {
        //Cidadão já existe?
        const cidadaoAlreadyExists = await prisma.cidadao.findUnique({
            where: {
                email,
            }
        })

        if (cidadaoAlreadyExists) {
            throw new AppError("Cidadão already exists", 400);
        }

        //Criar um cidadão
        const cidadao = await prisma.cidadao.create({
            data: {
                name,
                email,
                celular,
                senha,
                nick_name,
                sexo,
            },
        })

        return cidadao
    }
}