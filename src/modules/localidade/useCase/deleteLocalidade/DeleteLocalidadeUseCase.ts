import { Localidade } from '@prisma/client';
import { AppError } from '../../../../errors/AppError';
import { prisma } from '../../../../prisma/client';
import { IdLocalidadeDTO } from '../../dtos/IdLocalidadeDTO';

export class DeleteLocalidadeUseCase {
  async execute({ id }: IdLocalidadeDTO): Promise<Localidade> {
    //Localidade já existe?
    const localidadeAlreadyExists = await prisma.localidade.findUnique({
      where: {
        id,
      },
    });

    if (!localidadeAlreadyExists) {
      throw new AppError('Localidade does not exists', 404);
    }

    //Criar um Localidade
    const localidade = await prisma.localidade.delete({
      where: {
        id,
      },
    });

    return localidade;
  }
}
