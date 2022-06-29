import { Request, Response } from 'express';
import { CreatePostUseCase } from './CreatePostUseCase';

export class CreatePostController {
  async handle(req: Request, res: Response) {
    const {
      anonimo,
      descricao,
      status,
      localidade_id,
      cidadao_id,
      problemas_,
    } = req.body;

    const createPostUseCase = new CreatePostUseCase();

    const result = await createPostUseCase.execute({
      anonimo,
      descricao,
      status,
      localidade_id,
      cidadao_id,
      problemas_,
    });

    return res.status(201).json(result);
  }
}
