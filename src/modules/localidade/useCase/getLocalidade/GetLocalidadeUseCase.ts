import { Response } from 'express';
import { prisma } from '../../../../prisma/client';
import { IdLocalidadeDTO } from '../../dtos/IdLocalidadeDTO';

export class GetLocalidadeUseCase {
  async execute({ id }: IdLocalidadeDTO, res: Response) {
    //Cidadão já existe?
    const localidadeAlreadyExists = await prisma.localidade.findUnique({
      where: {
        id,
      },
    });

    if (!localidadeAlreadyExists) {
      return res.status(404).json({ message: "Localidade does not exists" })
    }

    return localidadeAlreadyExists;
  }
}
