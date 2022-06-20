import { Request, Response } from 'express';
import { DeleteCidadaoUseCase } from './DeleteCidadaosUseCase';

export class DeleteCidadaoController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteCidadaoUseCase = new DeleteCidadaoUseCase();

    const result = await deleteCidadaoUseCase.execute({
      id,
    });

    return res.status(200).json();
  }
}
