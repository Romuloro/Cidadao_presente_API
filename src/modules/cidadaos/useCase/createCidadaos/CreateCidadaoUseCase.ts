import { Cidadao } from '@prisma/client';
import { Request, Response } from 'express';
import { prisma } from '../../../../prisma/client';
import { CreateCidadaoDTO } from '../../dtos/CreateCidadaoDTO';

export class CreateCidadaoUseCase {
  async execute({
    name,
    email,
    celular,
    senha,
    nick_name,
    sexo,
    role
  }: CreateCidadaoDTO, res: Response) {
    //Cidadão já existe?
    const cidadaoAlreadyExists = await prisma.cidadao.findUnique({
      where: {
        email,
      },
    });

    if (cidadaoAlreadyExists) {
      return res.status(401).json({message:"Cidadão already exists"})
    }

    //Criar um cidadão
    const cidadao = await prisma.cidadao.create({
      data: {
        name,
        email,
        celular,
        senha,
        nick_name,
        sexo,
        role
      },
    });

    return cidadao;
  }
}
