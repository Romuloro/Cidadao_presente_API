import { Request, Response } from 'express';
import AuthService from '../../../../services/auth';
import { UpdateCidadaoUseCase } from './UpdateCidadaosUseCase';

export class UpdateCidadaoController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, celular, senha, nick_name, sexo } = req.body;

    const createCidadaoUseCase = new UpdateCidadaoUseCase();

    const encryptedPassword = await AuthService.hashPassword(senha)

    const result = await createCidadaoUseCase.execute({
      id,
      name,
      email,
      celular,
      senha: encryptedPassword,
      nick_name,
      sexo,
    }, res);

    return res.status(200).json(result);
  }
}
