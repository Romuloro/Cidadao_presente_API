import { Request, Response } from 'express';
import { DeleteProblemaUseCase } from './DeleteProblemaUseCase';

export class DeleteProblemaController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteProblemaUseCase = new DeleteProblemaUseCase();

    await deleteProblemaUseCase.execute({
      id,
    });

    return res.status(200).json();
  }
}
