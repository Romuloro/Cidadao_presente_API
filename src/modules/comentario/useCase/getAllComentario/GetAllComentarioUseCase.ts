import { Comentario } from '@prisma/client';
import { prisma } from '../../../../prisma/client';

export class GetAllComentarioUseCase {
  async execute(): Promise<Comentario[]> {
    const comentario = await prisma.comentario.findMany({});

    return comentario;
  }
}
