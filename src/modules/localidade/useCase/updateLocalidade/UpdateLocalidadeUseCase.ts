import { Localidade } from '@prisma/client';
import { AppError } from '../../../../errors/AppError';
import { prisma } from '../../../../prisma/client';
import { UpdateLocalidadeDTO } from '../../dtos/UpdateLocalidadeDTO';

export class UpdateLocalidadeUseCase {
  async execute({
    id,
    latitude,
    longitude,
    descricao,
  }: UpdateLocalidadeDTO): Promise<Localidade> {
    //Cidadão já existe?
    const localidadeAlreadyExists = await prisma.localidade.findUnique({
      where: {
        id,
      },
    });

    if (!localidadeAlreadyExists) {
      throw new AppError('Cidadão does not exists', 404);
    }

    //Update um cidadão
    const localidade = await prisma.localidade.update({
      where: {
        id,
      },
      data: {
        latitude,
        longitude,
        descricao,
      },
    });

    return localidade;
  }
}
