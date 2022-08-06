import { Request, Response } from 'express';
import { GetPostUseCase } from './GetPostUseCase';

export class GetPostController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const getPostUseCase = new GetPostUseCase();

    const result = await getPostUseCase.execute({
      id,
    }, res);

    return res.status(200).json(result);
  }
}
