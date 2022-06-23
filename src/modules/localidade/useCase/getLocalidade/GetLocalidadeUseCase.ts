import { Localidade } from '@prisma/client';
import { AppError } from '../../../../errors/AppError';
import { prisma } from '../../../../prisma/client';
import { IdLocalidadeDTO } from '../../dtos/IdLocalidadeDTO';

export class GetLocalidadeUseCase {
  async execute({ id }: IdLocalidadeDTO): Promise<Localidade> {
    //Cidadão já existe?
    const localidadeAlreadyExists = await prisma.localidade.findUnique({
      where: {
        id,
      },
    });

    if (!localidadeAlreadyExists) {
      throw new AppError('Localidade does not exists', 404);
    }

    return localidadeAlreadyExists;
  }
}
