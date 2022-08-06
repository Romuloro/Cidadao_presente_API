import { Request, Response } from 'express';
import { UpdateComentarioUseCase } from './UpdateComentarioUseCase';

export class UpdateComentarioController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { descricao, tipo, cidadao_id, post_id } = req.body;

    const updateComentarioUseCase = new UpdateComentarioUseCase();

    const result = await updateComentarioUseCase.execute({
      id,
      descricao,
      tipo,
      cidadao_id,
      post_id,
    }, res);

    return res.status(200).json(result);
  }
}
