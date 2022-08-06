import { Request, Response } from 'express';
import { UpdateProblemaUseCase } from './UpdateProblemaUseCase';

export class UpdateProblemaController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { titulo, descricao, tipo } = req.body;

    const updateProblemaUseCase = new UpdateProblemaUseCase();

    const result = await updateProblemaUseCase.execute({
      id,
      titulo,
      descricao,
      tipo,
    }, res);

    return res.status(200).json(result);
  }
}
