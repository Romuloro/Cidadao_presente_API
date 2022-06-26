import { Request, Response } from 'express';
import { CreateProblemaUseCase } from './CreateProblemaUseCase';

export class CreateProblemaController {
  async handle(req: Request, res: Response) {
    const { titulo, descricao, tipo } = req.body;

    const createProblemaUseCase = new CreateProblemaUseCase();

    const result = await createProblemaUseCase.execute({
      titulo,
      descricao,
      tipo
    });

    return res.status(201).json(result);
  }
}
