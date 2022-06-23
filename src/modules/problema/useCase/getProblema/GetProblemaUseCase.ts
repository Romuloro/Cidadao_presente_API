import { Problema } from '@prisma/client';
import { AppError } from '../../../../errors/AppError';
import { prisma } from '../../../../prisma/client';
import { IdProblemaDTO } from '../../dtos/IdProblemaDTO';

export class GetProblemaUseCase {
  async execute({ id }: IdProblemaDTO): Promise<Problema> {
    //Cidadão já existe?
    const problemaAlreadyExists = await prisma.problema.findUnique({
      where: {
        id,
      },
    });

    if (!problemaAlreadyExists) {
      throw new AppError('Problema does not exists', 404);
    }

    return problemaAlreadyExists;
  }
}
