import { Response } from 'express';
import { prisma } from '../../../../prisma/client';
import { CreateComentarioDTO } from '../../dtos/CreateComentarioDTO';

export class CreateComentarioUseCase {
  async execute({
    descricao,
    tipo,
    cidadao_id,
    post_id,
  }: CreateComentarioDTO, res: Response) {
    //Cidadão existe?
    const cidadaoAlreadyExists = await prisma.cidadao.findUnique({
      where: {
        id: cidadao_id,
      },
    });

    if (!cidadaoAlreadyExists) {
      return res.status(404).json({ message: "Cidadão does not exists" })
    }

    //Post existe?
    const postAlreadyExists = await prisma.post.findUnique({
      where: {
        id: post_id,
      },
    });

    if (!postAlreadyExists) {
      return res.status(404).json({ message: "Post does not exists" })
    }

    //Criar um cidadão
    const comentario = await prisma.comentario.create({
      data: {
        descricao,
        tipo,
        cidadao_id,
        post_id,
      },
    });

    return comentario;
  }
}
