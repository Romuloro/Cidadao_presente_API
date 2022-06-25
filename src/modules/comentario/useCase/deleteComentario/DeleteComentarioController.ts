import { Request, Response } from 'express';
import { DeleteComentarioUseCase } from './DeleteComentarioUseCase';

export class DeleteComentarioController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteComentarioUseCase = new DeleteComentarioUseCase();

    await deleteComentarioUseCase.execute({
      id,
    });

    return res.status(200).json();
  }
}
