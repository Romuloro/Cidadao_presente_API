import { ComentarioTipo } from '@prisma/client';

export interface CreateComentarioDTO {
  descricao: string;
  tipo: ComentarioTipo;
  cidadao_id: string;
  post_id: string;
}
