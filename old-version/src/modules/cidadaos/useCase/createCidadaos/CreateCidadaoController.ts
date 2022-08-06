import { Request, Response } from 'express';
import AuthService from '../../../../services/auth';
import { CreateCidadaoUseCase } from './CreateCidadaoUseCase';

export class CreateCidadaoController {
  async handle(req: Request, res: Response) {
    const { name, email, celular, senha, nick_name, sexo, role } = req.body;

    const createCidadaoUseCase = new CreateCidadaoUseCase();

    const encryptedPassword = await AuthService.hashPassword(senha)

    const result = await createCidadaoUseCase.execute({
      name,
      email,
      celular,
      senha: encryptedPassword,
      nick_name,
      sexo,
      role,
    }, res);

    return res.status(201).json(result);
  }
}
