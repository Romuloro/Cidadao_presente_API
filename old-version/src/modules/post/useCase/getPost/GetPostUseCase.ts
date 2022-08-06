import { Response } from 'express';
import { prisma } from '../../../../prisma/client';
import { IdPostDTO } from '../../dtos/IdPostDTO';

export class GetPostUseCase {
  async execute({ id }: IdPostDTO, res: Response) {
    //Cidadão já existe?
    const postAlreadyExists = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!postAlreadyExists) {
      return res.status(404).json({ message: "Post does not exists" })
    }

    return postAlreadyExists;
  }
}
