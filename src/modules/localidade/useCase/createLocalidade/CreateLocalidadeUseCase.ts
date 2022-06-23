import { Localidade } from '@prisma/client';
import { AppError } from '../../../../errors/AppError';
import { prisma } from '../../../../prisma/client';
import { CreateLocalidadeDTO } from '../../dtos/CreateLocalidadeDTO';

export class CreateLocalidadeUseCase {
  async execute({
    latitude,
    longitude,
    descricao
  }: CreateLocalidadeDTO): Promise<Localidade> {
    //Cidadão já existe?
    const localidadeAlreadyExists = await prisma.localidade.findUnique({
      where: {
        latitude,
        longitude
      },
    });

    if (localidadeAlreadyExists) {
      throw new AppError('Localidade already exists', 400);
    }

    //Criar um cidadão
    const localidade = await prisma.localidade.create({
      data: {
        latitude,
        longitude,
        descricao
      },
    });

    return localidade;
  }
}
