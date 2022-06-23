import { Request, Response } from 'express';
import { GetProblemaUseCase } from './GetProblemaUseCase';

export class GetProblemaController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const getProblemaUseCase = new GetProblemaUseCase();

    const result = await getProblemaUseCase.execute({
      id,
    });

    return res.status(200).json(result);
  }
}
