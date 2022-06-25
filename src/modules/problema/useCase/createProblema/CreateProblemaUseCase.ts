import { Problema } from '@prisma/client';
import { AppError } from '../../../../errors/AppError';
import { prisma } from '../../../../prisma/client';
import { CreateProblemaDTO } from '../../dtos/CreateProblemaDTO';

export class CreateProblemaUseCase {
  async execute({
    titulo,
    descricao,
    tipo,
  }: CreateProblemaDTO): Promise<Problema> {
    //Cidadão já existe?
    const localidadeAlreadyExists = await prisma.problema.findUnique({
      where: {
        titulo,
      },
    });

    if (localidadeAlreadyExists) {
      throw new AppError('Problema already exists', 400);
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
