import { Request, Response } from 'express';
import { UpdateLocalidadeUseCase } from './UpdateLocalidadeUseCase';

export class UpdateLocalidadeController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { latitude, longitude, descricao } = req.body;

    const updateLocalidadeUseCase = new UpdateLocalidadeUseCase();

    const result = await updateLocalidadeUseCase.execute({
      id,
      latitude,
      longitude,
      descricao,
    });

    return res.status(200).json(result);
  }
}
