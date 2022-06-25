import { Request, Response } from 'express';
import { GetComentarioUseCase } from './GetComentarioUseCase';

export class GetComentarioController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const getComentarioUseCase = new GetComentarioUseCase();

    const result = await getComentarioUseCase.execute({
      id,
    });

    return res.status(200).json(result);
  }
}
