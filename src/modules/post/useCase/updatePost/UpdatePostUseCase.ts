import { Response } from 'express';
import { prisma } from '../../../../prisma/client';
import { UpdatePostDTO } from '../../dtos/UpdatePostDTO';

export class UpdatePostUseCase {
  async execute({
    id,
    anonimo,
    descricao,
    status,
    localidade_id,
    cidadao_id,
    problemas_,
  }: UpdatePostDTO, res: Response) {
    //Localidade já existe?
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

    //Cidadão já existe?
    const postAlreadyExists = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!postAlreadyExists) {
      return res.status(404).json({ message: "Post does not exists" })
    }

    const problemas = problemas_.map((problema) => { return { id: problema } })

    //Problema já existe?
    const problemaAlreadyExists = problemas_.map(async(problema) => {
      await prisma.problema.findUnique({
        where: {
          id: problema,
        },
      });
    })

    if (!problemaAlreadyExists) {
      return res.status(404).json({ message: "Problema does not exists" })
    }

    //Update um cidadão
    const post = await prisma.post.update({
      where: {
        id,
      },
      data: {
        anonimo,
        descricao,
        status,
        localidade_id,
        cidadao_id,
        problemas: {
          connect: problemas,
        },
      },
    });

    return post;
  }
}
