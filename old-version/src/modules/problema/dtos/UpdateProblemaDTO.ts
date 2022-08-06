import { Tipo } from '@prisma/client';

export interface UpdateProblemaDTO {
  id: string;
  titulo: string;
  descricao: string;
  tipo: Tipo;
}
