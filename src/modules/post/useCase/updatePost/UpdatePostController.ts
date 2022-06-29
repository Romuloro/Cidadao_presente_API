import { Request, Response } from 'express';
import { UpdatePostUseCase } from './UpdatePostUseCase';

export class UpdatePostController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const {
      anonimo,
      descricao,
      status,
      localidade_id,
      cidadao_id,
      problemas_,
    } = req.body;

    const updatePostUseCase = new UpdatePostUseCase();

    const result = await updatePostUseCase.execute({
      id,
      anonimo,
      descricao,
      status,
      localidade_id,
      cidadao_id,
      problemas_,
    });

    return res.status(200).json(result);
  }
}
