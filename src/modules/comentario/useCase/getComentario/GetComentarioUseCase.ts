import { Comentario } from '@prisma/client';
import { AppError } from '../../../../errors/AppError';
import { prisma } from '../../../../prisma/client';
import { IdComentarioDTO } from '../../dtos/IdComentarioDTO';

export class GetComentarioUseCase {
  async execute({ id }: IdComentarioDTO): Promise<Comentario> {
    //Cidadão já existe?
    const comentarioAlreadyExists = await prisma.comentario.findUnique({
      where: {
        id,
      },
    });

    if (!comentarioAlreadyExists) {
      throw new AppError('Comentário does not exists', 404);
    }

    return comentarioAlreadyExists;
  }
}
