import { Request, Response } from 'express';
import { CreateLocalidadeUseCase } from './CreateLocalidadeUseCase';

export class CreateLocalidadeController {
  async handle(req: Request, res: Response) {
    const { nickName } = req.params;
    console.log(nickName)
    const { latitude, longitude, descricao } = req.body;

    const createLocalidadeUseCase = new CreateLocalidadeUseCase();

    const result = await createLocalidadeUseCase.execute({
      latitude,
      longitude,
      descricao,
      nickName
    });

    return res.status(201).json(result);
  }
}
