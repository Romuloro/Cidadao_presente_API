import { Response } from 'express';
import { prisma } from '../../../../prisma/client';
import { UpdateCidadaoDTO } from '../../dtos/UpdateCidadaoDTO';

export class UpdateCidadaoUseCase {
  async execute({
    id,
    name,
    email,
    celular,
    senha,
    nick_name,
    sexo,
    role
  }: UpdateCidadaoDTO, res: Response) {
    //Cidadão já existe?
    const cidadaoAlreadyExists = await prisma.cidadao.findUnique({
      where: {
        id,
      },
    });

    if (!cidadaoAlreadyExists) {
      return res.status(404).json({ message: "Cidadão does not exists" })
    }

    //Update um cidadão
    const cidadao = await prisma.cidadao.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        celular,
        senha,
        nick_name,
        sexo,
        role,
      },
    });

    return cidadao;
  }
}
