import { Post } from '@prisma/client';
import { AppError } from '../../../../errors/AppError';
import { prisma } from '../../../../prisma/client';
import { IdPostDTO } from '../../dtos/IdPostDTO';

export class DeletePostUseCase {
  async execute({ id }: IdPostDTO): Promise<Post> {
    //Localidade já existe?
    const postAlreadyExists = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!postAlreadyExists) {
      throw new AppError('Post does not exists', 404);
    }

    //Criar um post
    const post = await prisma.post.delete({
      where: {
        id,
      },
    });

    return post;
  }
}
