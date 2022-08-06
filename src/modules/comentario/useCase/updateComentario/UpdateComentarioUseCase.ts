import { Response } from 'express';
import { prisma } from '../../../../prisma/client';
import { UpdateComentarioDTO } from '../../dtos/UpdateComentarioDTO';

export class UpdateComentarioUseCase {
  async execute({
    id,
    descricao,
    tipo,
    cidadao_id,
    post_id,
  }: UpdateComentarioDTO, res: Response) {
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

    //Comentário existe?
    const comentarioAlreadyExists = await prisma.comentario.findUnique({
      where: {
        id,
      },
    });

    if (!comentarioAlreadyExists) {
      return res.status(404).json({ message: "Comentário does not exists" })
    }

    //Update um cidadão
    const comentario = await prisma.comentario.update({
      where: {
        id,
      },
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
