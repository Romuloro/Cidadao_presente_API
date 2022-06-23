import { Problema } from '@prisma/client';
import { AppError } from '../../../../errors/AppError';
import { prisma } from '../../../../prisma/client';
import { UpdateProblemaDTO } from '../../dtos/UpdateProblemaDTO';

export class UpdateProblemaUseCase {
  async execute({
    id,
    titulo,
    descricao,
    tipo
  }: UpdateProblemaDTO): Promise<Problema> {
    //Cidadão já existe?
    const problemaAlreadyExists = await prisma.problema.findUnique({
      where: {
        id,
      },
    });

    if (!problemaAlreadyExists) {
      throw new AppError('Cidadão does not exists', 404);
    }

    //Update um cidadão
    const problema = await prisma.problema.update({
      where: {
        id,
      },
      data: {
        titulo,
        descricao,
        tipo
      },
    });

    return problema;
  }
}
