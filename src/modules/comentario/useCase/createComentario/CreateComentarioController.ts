import { Request, Response } from 'express';
import { CreateComentarioUseCase } from './CreateComentarioUseCase';

export class CreateComentarioController {
  async handle(req: Request, res: Response) {
    const { descricao, tipo, cidadao_id, post_id } = req.body;

    const createComentarioUseCase = new CreateComentarioUseCase();

    const result = await createComentarioUseCase.execute({
      descricao,
      tipo,
      cidadao_id,
      post_id,
    }, res);

    return res.status(201).json(result);
  }
}
