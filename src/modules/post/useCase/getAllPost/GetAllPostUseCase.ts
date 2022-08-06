import { Post } from '@prisma/client';
import { prisma } from '../../../../prisma/client';

export class GetAllPostUseCase {
  async execute(): Promise<Post[]> {
    const post = await prisma.post.findMany({
      include: {
        problemas: {
          select: {
            titulo: true,
            tipo: true
          }
        },
        comentarios: {
          orderBy: {
            create_at: "desc"
          },
          select: {
            descricao: true,
            tipo: true,
            author: {
              select: {
                nick_name: true
              }
            }
          }
        }
      }
    });

    return post;
  }
}
