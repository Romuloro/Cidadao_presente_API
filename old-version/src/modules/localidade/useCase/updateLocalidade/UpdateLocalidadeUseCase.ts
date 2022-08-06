import { Response } from 'express';
import { prisma } from '../../../../prisma/client';
import { UpdateLocalidadeDTO } from '../../dtos/UpdateLocalidadeDTO';

export class UpdateLocalidadeUseCase {
  async execute({
    id,
    latitude,
    longitude,
    descricao,
    nickName,
  }: UpdateLocalidadeDTO, res: Response) {
    //Cidadão já existe?
    const localidadeAlreadyExists = await prisma.localidade.findUnique({
      where: {
        id,
      },
    });

    if (!localidadeAlreadyExists) {
      return res.status(404).json({ message: "Localidade does not exists" })
    }

    //Cidadão já existe?
    const cidadaoAlreadyExists = await prisma.cidadao.findUnique({
      where: {
        nick_name: nickName,
      },
    });

    if (!cidadaoAlreadyExists) {
      return res.status(404).json({ message: "Cidadão does not exists" })
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
        cidadaos: {
          connect: [{ nick_name: nickName }],
        },
      },
    });

    return localidade;
  }
}
