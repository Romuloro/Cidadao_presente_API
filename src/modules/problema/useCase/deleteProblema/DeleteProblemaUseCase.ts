import { Response } from 'express';
import { prisma } from '../../../../prisma/client';
import { IdProblemaDTO } from '../../dtos/IdProblemaDTO';

export class DeleteProblemaUseCase {
  async execute({ id }: IdProblemaDTO, res: Response) {
    //Problema já existe?
    const problemaAlreadyExists = await prisma.problema.findUnique({
      where: {
        id,
      },
    });

    if (!problemaAlreadyExists) {
      return res.status(404).json({ message: "Problema does not exists" })
    }

    //Criar um problema
    const problema = await prisma.problema.delete({
      where: {
        id,
      },
    });

    return problema;
  }
}
