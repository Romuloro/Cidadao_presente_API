import { Request, Response } from 'express';
import { GetAllLocalidadeUseCase } from './GetAllLocalidadeUseCase';

export class GetAllLocalidadeController {
  async handle(req: Request, res: Response) {
    const getAllCidadaoUseCase = new GetAllLocalidadeUseCase();

    const result = await getAllCidadaoUseCase.execute();

    return res.status(200).json(result);
  }
}
