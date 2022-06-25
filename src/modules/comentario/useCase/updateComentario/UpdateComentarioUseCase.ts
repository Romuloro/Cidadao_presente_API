import { Comentario } from '@prisma/client';
import { AppError } from '../../../../errors/AppError';
import { prisma } from '../../../../prisma/client';
import { UpdateComentarioDTO } from '../../dtos/UpdateComentarioDTO';

export class UpdateComentarioUseCase {
  async execute({
    id,
    descricao,
    tipo,
    cidadao_id,
    post_id,
  }: UpdateComentarioDTO): Promise<Comentario> {
    //Cidadão existe?
    const cidadaoAlreadyExists = await prisma.cidadao.findUnique({
      where: {
        id: cidadao_id,
      },
    });

    if (!cidadaoAlreadyExists) {
      throw new AppError('Cidadão does not exists', 404);
    }

    //Post existe?
    const postAlreadyExists = await prisma.post.findUnique({
      where: {
        id: post_id,
      },
    });

    if (!postAlreadyExists) {
      throw new AppError('Post does not exists', 404);
    }

    //Comentário existe?
    const comentarioAlreadyExists = await prisma.comentario.findUnique({
      where: {
        id,
      },
    });

    if (!comentarioAlreadyExists) {
      throw new AppError('Comentário does not exists', 404);
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
