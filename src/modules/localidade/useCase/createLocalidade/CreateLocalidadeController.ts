import { Request, Response } from 'express';
import { CreateLocalidadeUseCase } from './CreateLocalidadeUseCase';

export class CreateLocalidadeController {
  async handle(req: Request, res: Response) {
    const { latitude, longitude, descricao } = req.body;

    const createLocalidadeUseCase = new CreateLocalidadeUseCase();

    const result = await createLocalidadeUseCase.execute({
      latitude,
      longitude,
      descricao
    });

    return res.status(201).json(result);
  }
}
