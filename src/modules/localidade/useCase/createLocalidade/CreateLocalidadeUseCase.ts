import { Response } from 'express';
import { prisma } from '../../../../prisma/client';
import { CreateLocalidadeDTO } from '../../dtos/CreateLocalidadeDTO';

export class CreateLocalidadeUseCase {
  async execute({
    latitude,
    longitude,
    descricao,
    nickName,
  }: CreateLocalidadeDTO, res: Response) {
    //Cidadão já existe?
    const localidadeAlreadyExists = await prisma.localidade.findFirst({
      where: {
        latitude,
        longitude,
      },
    });

    if (localidadeAlreadyExists) {
      return res.status(404).json({ message: "Localidade already exists" })
    }

    //Cidadão já existe?
    const cidadaoAlreadyExists = await prisma.cidadao.findFirst({
      where: {
        nick_name: nickName,
      },
    });

    if (!cidadaoAlreadyExists) {
      return res.status(404).json({ message: "Cidadão does not exists" })
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
