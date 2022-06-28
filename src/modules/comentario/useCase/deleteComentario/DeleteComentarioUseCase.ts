import { Comentario } from '@prisma/client';
import { AppError } from '../../../../errors/AppError';
import { prisma } from '../../../../prisma/client';
import { IdComentarioDTO } from '../../dtos/IdComentarioDTO';

export class DeleteComentarioUseCase {
  async execute({ id }: IdComentarioDTO): Promise<Comentario> {
    //Comentario já existe?
    const comentarioAlreadyExists = await prisma.comentario.findUnique({
      where: {
        id,
      },
    });

    if (!comentarioAlreadyExists) {
      throw new AppError('Comentário does not exists', 404);
    }

    //Criar um comentario
    const comentario = await prisma.comentario.delete({
      where: {
        id,
      },
    });

    return comentario;
  }
}
