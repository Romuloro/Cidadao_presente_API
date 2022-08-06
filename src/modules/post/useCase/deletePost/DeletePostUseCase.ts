import { Response } from 'express';
import { prisma } from '../../../../prisma/client';
import { IdPostDTO } from '../../dtos/IdPostDTO';

export class DeletePostUseCase {
  async execute({ id }: IdPostDTO, res: Response) {
    //Localidade já existe?
    const postAlreadyExists = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!postAlreadyExists) {
      return res.status(404).json({ message: "Post does not exists" })
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
