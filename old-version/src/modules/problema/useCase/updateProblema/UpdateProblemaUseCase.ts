import { Response } from 'express';
import { prisma } from '../../../../prisma/client';
import { UpdateProblemaDTO } from '../../dtos/UpdateProblemaDTO';

export class UpdateProblemaUseCase {
  async execute({
    id,
    titulo,
    descricao,
    tipo,
  }: UpdateProblemaDTO, res: Response) {
    //Cidadão já existe?
    const problemaAlreadyExists = await prisma.problema.findUnique({
      where: {
        id,
      },
    });

    if (!problemaAlreadyExists) {
      return res.status(404).json({ message: "Problema does not exists" })
    }

    //Update um cidadão
    const problema = await prisma.problema.update({
      where: {
        id,
      },
      data: {
        titulo,
        descricao,
        tipo,
      },
    });

    return problema;
  }
}
