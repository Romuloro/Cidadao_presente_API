import { Request, Response } from 'express';
import { GetAllComentarioUseCase } from './GetAllComentarioUseCase';

export class GetAllComentarioController {
  async handle(req: Request, res: Response) {
    const getAllComentarioUseCase = new GetAllComentarioUseCase();

    const result = await getAllComentarioUseCase.execute();

    return res.status(200).json(result);
  }
}
