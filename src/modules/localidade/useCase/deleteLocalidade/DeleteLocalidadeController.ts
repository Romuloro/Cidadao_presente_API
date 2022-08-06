import { Request, Response } from 'express';
import { DeleteLocalidadeUseCase } from './DeleteLocalidadeUseCase';

export class DeleteLocalidadeController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteLocalidadeUseCase = new DeleteLocalidadeUseCase();

    await deleteLocalidadeUseCase.execute({
      id,
    }, res);

    return res.status(200).json();
  }
}
