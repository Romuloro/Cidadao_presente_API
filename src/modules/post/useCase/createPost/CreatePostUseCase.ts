import { Post } from '@prisma/client';
import { AppError } from '../../../../errors/AppError';
import { prisma } from '../../../../prisma/client';
import { CreatePostDTO } from '../../dtos/CreatePostDTO';

export class CreatePostUseCase {
  async execute({
    anonimo,
    descricao,
    status,
    localidade_id,
    cidadao_id,
  }: CreatePostDTO): Promise<Post> {
    //Cidadão já existe?
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

    //Criar um cidadão
    const post = await prisma.post.create({
      data: {
        anonimo,
        descricao,
        status,
        localidade_id,
        cidadao_id,
      },
    });

    return post;
  }
}
