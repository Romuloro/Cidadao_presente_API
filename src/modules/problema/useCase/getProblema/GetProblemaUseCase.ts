import { Response } from 'express';
import { prisma } from '../../../../prisma/client';
import { IdProblemaDTO } from '../../dtos/IdProblemaDTO';

export class GetProblemaUseCase {
  async execute({ id }: IdProblemaDTO, res: Response) {
    //Cidadão já existe?
    const problemaAlreadyExists = await prisma.problema.findUnique({
      where: {
        id,
      },
    });

    if (!problemaAlreadyExists) {
      return res.status(404).json({ message: "Problema does not exists" })
    }

    return problemaAlreadyExists;
  }
}
