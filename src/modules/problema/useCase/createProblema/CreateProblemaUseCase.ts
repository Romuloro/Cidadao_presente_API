import { Response } from 'express';
import { prisma } from '../../../../prisma/client';
import { CreateProblemaDTO } from '../../dtos/CreateProblemaDTO';

export class CreateProblemaUseCase {
  async execute({
    titulo,
    descricao,
    tipo,
  }: CreateProblemaDTO, res:Response) {
    //Cidadão já existe?
    const localidadeAlreadyExists = await prisma.problema.findUnique({
      where: {
        titulo,
      },
    });

    if (localidadeAlreadyExists) {
      return res.status(404).json({ message: "Problema does not exists" })
    }

    //Criar um cidadão
    const problema = await prisma.problema.create({
      data: {
        titulo,
        descricao,
        tipo,
      },
    });

    return problema;
  }
}
