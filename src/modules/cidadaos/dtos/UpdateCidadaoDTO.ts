import { Sexo } from "@prisma/client";

export interface UpdateCidadaoDTO {
    id: string;
    name: string;
    email: string;
    celular: number;
    senha: string;
    nick_name: string;
    sexo: Sexo;
}
