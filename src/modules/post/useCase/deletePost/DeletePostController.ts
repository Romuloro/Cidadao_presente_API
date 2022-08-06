import { Request, Response } from 'express';
import { DeletePostUseCase } from './DeletePostUseCase';

export class DeletePostController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deletePostUseCase = new DeletePostUseCase();

    await deletePostUseCase.execute({
      id,
    }, res);

    return res.status(200).json();
  }
}
