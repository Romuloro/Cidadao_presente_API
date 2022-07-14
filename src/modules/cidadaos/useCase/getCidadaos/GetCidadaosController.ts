import { Request, Response } from 'express';
import { GetCidadaoUseCase } from './GetCidadaosUseCase';

export class GetCidadaoController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const getCidadaoUseCase = new GetCidadaoUseCase();

    const result = await getCidadaoUseCase.execute({id}, res);

    return res.status(200).json(result);
  }
}
