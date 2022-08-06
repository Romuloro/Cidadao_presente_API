import { Localidade } from '@prisma/client';
import { prisma } from '../../../../prisma/client';

export class GetAllLocalidadeUseCase {
  async execute(): Promise<Localidade[]> {
    const localidade = await prisma.localidade.findMany({});

    return localidade;
  }
}
