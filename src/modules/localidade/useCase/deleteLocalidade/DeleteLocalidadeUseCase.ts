import { Response } from 'express';
import { prisma } from '../../../../prisma/client';
import { IdLocalidadeDTO } from '../../dtos/IdLocalidadeDTO';

export class DeleteLocalidadeUseCase {
  async execute({ id }: IdLocalidadeDTO, res: Response) {
    //Localidade já existe?
    const localidadeAlreadyExists = await prisma.localidade.findUnique({
      where: {
        id,
      },
    });

    if (!localidadeAlreadyExists) {
      return res.status(404).json({ message: "Localidade does not exists" })
    }

    //Criar um Localidade
    const localidade = await prisma.localidade.delete({
      where: {
        id,
      },
    });

    return localidade;
  }
}
