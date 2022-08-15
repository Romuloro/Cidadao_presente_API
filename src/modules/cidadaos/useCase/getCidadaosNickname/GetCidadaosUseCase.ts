import { Response } from 'express';
import { prisma } from '../../../../prisma/client';
import { NicknameCidadaoDTO } from '../../dtos/NicknameCidadaoDTO';

export class GetCidadaoUseCase {
  async execute({ nick_name }: NicknameCidadaoDTO, res: Response) {
    //Cidadão já existe?
    const cidadaoAlreadyExists = await prisma.cidadao.findUnique({
      where: {
        nick_name,
      },
    });

    if (!cidadaoAlreadyExists) {
      return res.status(404).json({ message: "Cidadão does not exists" })
    }

    return cidadaoAlreadyExists;
  }
}
