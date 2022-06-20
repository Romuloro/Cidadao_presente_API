import { Request, Response } from 'express';
import { CreateCidadaoUseCase } from './CreateCidadaoUseCase';

export class CreateCidadaoController {
  async handle(req: Request, res: Response) {
    const { name, email, celular, senha, nick_name, sexo } = req.body;

    const createCidadaoUseCase = new CreateCidadaoUseCase();

    const result = await createCidadaoUseCase.execute({
      name,
      email,
      celular,
      senha,
      nick_name,
      sexo,
    });

    return res.status(201).json(result);
  }
}
