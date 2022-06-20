import { Sexo } from '@prisma/client';

export interface CreateCidadaoDTO {
  name: string;
  email: string;
  celular: string;
  senha: string;
  nick_name: string;
  sexo: Sexo;
}
