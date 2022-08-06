import { ComentarioTipo } from '@prisma/client';

export interface UpdateComentarioDTO {
  id: string;
  descricao: string;
  tipo: ComentarioTipo;
  cidadao_id: string;
  post_id: string;
}
