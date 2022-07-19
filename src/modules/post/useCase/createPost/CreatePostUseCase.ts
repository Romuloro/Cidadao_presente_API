import { Response } from 'express';
import { prisma } from '../../../../prisma/client';
import { CreatePostDTO } from '../../dtos/CreatePostDTO';

export class CreatePostUseCase {
  async execute({
    anonimo,
    descricao,
    status,
    localidade_id,
    cidadao_id,
    problemas_,
  }: CreatePostDTO, res: Response) {
    //Cidadão já existe?
    const localidadeAlreadyExists = await prisma.localidade.findUnique({
      where: {
        id: localidade_id,
      },
    });

    if (!localidadeAlreadyExists) {
      return res.status(404).json({ message: "Localidade does not exists" })
    }

    //Cidadão já existe?
    const cidadaoAlreadyExists = await prisma.cidadao.findUnique({
      where: {
        id: cidadao_id,
      },
    });

    if (!cidadaoAlreadyExists) {
      return res.status(404).json({ message: "Cidadão does not exists" })
    }

    const problemas = problemas_.map((problema) => { return { id: problema } })

    //Criar um cidadão
    const post = await prisma.post.create({
      data: {
        anonimo,
        descricao,
        status,
        localidade_id,
        cidadao_id,
        problemas: {
          connect: problemas
        }
      }
    })
    return post

}
}