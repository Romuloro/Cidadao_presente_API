import { Request, Response } from 'express';
import { GetCidadaoUseCase } from './GetCidadaosUseCase';

export class GetCidadaoControllerNickName {
  async handle(req: Request, res: Response) {
    const { nick_name } = req.params;

    const getCidadaoUseCase = new GetCidadaoUseCase();

    const result = await getCidadaoUseCase.execute({ nick_name }, res);

    return res.status(200).json(result);
  }
}
