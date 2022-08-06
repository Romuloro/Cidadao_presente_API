import { Tipo } from '@prisma/client';

export interface CreateProblemaDTO {
  titulo: string;
  descricao: string;
  tipo: Tipo;
}
