import { Cidadao } from '@prisma/client';
import { AppError } from '../../../../errors/AppError';
import { prisma } from '../../../../prisma/client';
import { UpdateCidadaoDTO } from '../../dtos/UpdateCidadaoDTO';

export class UpdateCidadaoUseCase {
  async execute({
    id,
    name,
    email,
    celular,
    senha,
    nick_name,
    sexo,
  }: UpdateCidadaoDTO): Promise<Cidadao> {
    //Cidadão já existe?
    const cidadaoAlreadyExists = await prisma.cidadao.findUnique({
      where: {
        id,
      },
    });

    if (!cidadaoAlreadyExists) {
      throw new AppError('Cidadão does not exists', 404);
    }

    //Update um cidadão
    const cidadao = await prisma.cidadao.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        celular,
        senha,
        nick_name,
        sexo,
      }
    });

    return cidadao;
  }
}
