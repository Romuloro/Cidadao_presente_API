import { Request, Response } from 'express';
import { GetAllPostUseCase } from './GetAllPostUseCase';

export class GetAllPostController {
  async handle(req: Request, res: Response) {
    const getAllPostUseCase = new GetAllPostUseCase();

    const result = await getAllPostUseCase.execute();

    return res.status(200).json(result);
  }
}
