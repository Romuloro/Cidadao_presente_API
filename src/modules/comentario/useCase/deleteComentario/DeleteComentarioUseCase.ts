import { Response } from 'express';
import { prisma } from '../../../../prisma/client';
import { IdComentarioDTO } from '../../dtos/IdComentarioDTO';

export class DeleteComentarioUseCase {
  async execute({ id }: IdComentarioDTO ,res: Response) {
    //Comentario já existe?
    const comentarioAlreadyExists = await prisma.comentario.findUnique({
      where: {
        id,
      },
    });

    if (!comentarioAlreadyExists) {
      return res.status(404).json({ message: "Comentário does not exists" })
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
