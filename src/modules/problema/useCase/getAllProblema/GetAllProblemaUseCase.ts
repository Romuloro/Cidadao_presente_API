import { Problema } from '@prisma/client';
import { prisma } from '../../../../prisma/client';

export class GetAllProblemaUseCase {
  async execute(): Promise<Problema[]> {
    const problema = await prisma.problema.findMany({});

    return problema;
  }
}
