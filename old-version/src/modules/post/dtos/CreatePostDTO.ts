import { Status } from '@prisma/client';

export interface CreatePostDTO {
  anonimo: boolean;
  descricao: string;
  status: Status;
  localidade_id: string;
  cidadao_id: string;
  problemas_: string[];
}
