import { Post } from '@prisma/client';
import { AppError } from '../../../../errors/AppError';
import { prisma } from '../../../../prisma/client';
import { IdPostDTO } from '../../dtos/IdPostDTO';

export class GetPostUseCase {
  async execute({ id }: IdPostDTO): Promise<Post> {
    //Cidadão já existe?
    const postAlreadyExists = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!postAlreadyExists) {
      throw new AppError('Post does not exists', 404);
    }

    return postAlreadyExists;
  }
}
