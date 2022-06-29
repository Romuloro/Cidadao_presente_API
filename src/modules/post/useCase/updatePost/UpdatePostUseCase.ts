import { Post } from '@prisma/client';
import { AppError } from '../../../../errors/AppError';
import { prisma } from '../../../../prisma/client';
import { UpdatePostDTO } from '../../dtos/UpdatePostDTO';

export class UpdatePostUseCase {
  async execute({
    id,
    anonimo,
    descricao,
    status,
    localidade_id,
    cidadao_id,
    problemas_,
  }: UpdatePostDTO): Promise<Post> {
    //Localidade já existe?
    const localidadeAlreadyExists = await prisma.localidade.findUnique({
      where: {
        id: localidade_id,
      },
    });

    if (!localidadeAlreadyExists) {
      throw new AppError('Localidade does not exists', 404);
    }

    //Cidadão já existe?
    const cidadaoAlreadyExists = await prisma.cidadao.findUnique({
      where: {
        id: cidadao_id,
      },
    });

    if (!cidadaoAlreadyExists) {
      throw new AppError('Cidadão does not exists', 404);
    }

    //Cidadão já existe?
    const problemaAlreadyExists = await prisma.problema.findUnique({
      where: {
        id: problemas_,
      },
    });

    if (!problemaAlreadyExists) {
      throw new AppError('Problema does not exists', 404);
    }

    //Cidadão já existe?
    const postAlreadyExists = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!postAlreadyExists) {
      throw new AppError('Post does not exists', 404);
    }

    //Update um cidadão
    const post = await prisma.post.update({
      where: {
        id,
      },
      data: {
        anonimo,
        descricao,
        status,
        localidade_id,
        cidadao_id,
        problemas: {
          connect: [{ id: problemas_ }],
        },
      },
    });

    return post;
  }
}
