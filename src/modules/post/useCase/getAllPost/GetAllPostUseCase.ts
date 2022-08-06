import { Post } from '@prisma/client';
import { prisma } from '../../../../prisma/client';

export class GetAllPostUseCase {
  async execute(): Promise<Post[]> {
    const post = await prisma.post.findMany({});

    return post;
  }
}
