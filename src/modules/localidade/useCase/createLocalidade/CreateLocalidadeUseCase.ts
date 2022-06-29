import { Localidade } from '@prisma/client';
import { AppError } from '../../../../errors/AppError';
import { prisma } from '../../../../prisma/client';
import { CreateLocalidadeDTO } from '../../dtos/CreateLocalidadeDTO';

export class CreateLocalidadeUseCase {
  async execute({
    latitude,
    longitude,
    descricao,
    nickName,
  }: CreateLocalidadeDTO): Promise<Localidade> {
    //Cidadão já existe?
    const localidadeAlreadyExists = await prisma.localidade.findFirst({
      where: {
        latitude,
        longitude,
      },
    });

    if (localidadeAlreadyExists) {
      throw new AppError('Localidade already exists', 400);
    }

    //Cidadão já existe?
    const cidadaoAlreadyExists = await prisma.cidadao.findFirst({
      where: {
        nick_name: nickName,
      },
    });

    if (!cidadaoAlreadyExists) {
      throw new AppError('Cidadão does not exists', 400);
    }

    //Criar um cidadão
    const localidade = await prisma.localidade.create({
      data: {
        latitude,
        longitude,
        descricao,
        cidadaos: {
          connect: [{ nick_name: nickName }],
        },
      },
    });

    return localidade;
  }
}
