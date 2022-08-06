import { Response } from 'express';
import { prisma } from '../../../../prisma/client';
import { IdComentarioDTO } from '../../dtos/IdComentarioDTO';

export class GetComentarioUseCase {
  async execute({ id }: IdComentarioDTO, res: Response) {
    //Cidadão já existe?
    const comentarioAlreadyExists = await prisma.comentario.findUnique({
      where: {
        id,
      },
    });

    if (!comentarioAlreadyExists) {
      return res.status(404).json({ message: "Comentário does not exists" })
    }

    return comentarioAlreadyExists;
  }
}
