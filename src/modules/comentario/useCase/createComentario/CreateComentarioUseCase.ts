import { Comentario } from '@prisma/client';
import { AppError } from '../../../../errors/AppError';
import { prisma } from '../../../../prisma/client';
import { CreateComentarioDTO } from '../../dtos/CreateComentarioDTO';

export class CreateComentarioUseCase {
  async execute({
    descricao,
    tipo,
    cidadao_id,
    post_id,
  }: CreateComentarioDTO): Promise<Comentario> {
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
