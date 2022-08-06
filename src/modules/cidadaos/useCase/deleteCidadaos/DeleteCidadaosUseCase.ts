import { Response } from 'express';
import { prisma } from '../../../../prisma/client';
import { IdCidadaoDTO } from '../../dtos/IdCidadaoDTO';

export class DeleteCidadaoUseCase {
  async execute({ id }: IdCidadaoDTO, res: Response) {
    //Cidadão já existe?
    const cidadaoAlreadyExists = await prisma.cidadao.findUnique({
      where: {
        id,
      },
    });

    if (!cidadaoAlreadyExists) {
      return res.status(404).json({ message: "Cidadão does not exists"})
    }

    //Criar um cidadão
    const cidadao = await prisma.cidadao.delete({
      where: {
        id,
      },
    });

    return cidadao;
  }
}
