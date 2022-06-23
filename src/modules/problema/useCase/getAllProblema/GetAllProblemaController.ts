import { Request, Response } from 'express';
import { GetAllProblemaUseCase } from './GetAllProblemaUseCase';

export class GetAllProblemaController {
  async handle(req: Request, res: Response) {
    const getAllProblemaUseCase = new GetAllProblemaUseCase();

    const result = await getAllProblemaUseCase.execute();

    return res.status(200).json(result);
  }
}
