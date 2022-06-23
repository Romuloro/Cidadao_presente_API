import { Request, Response } from 'express';
import { GetLocalidadeUseCase } from './GetLocalidadeUseCase';

export class GetLocalidadeController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const getLocalidadeUseCase = new GetLocalidadeUseCase();

    const result = await getLocalidadeUseCase.execute({
      id,
    });

    return res.status(200).json(result);
  }
}
