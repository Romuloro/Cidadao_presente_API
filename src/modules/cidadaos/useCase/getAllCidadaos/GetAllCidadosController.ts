import { Request, Response } from "express";
import { GetAllCidadaoUseCase } from "./GetAllCidadaosUseCase";



export class GetAllCidadaoController {
    async handle(req: Request, res: Response) {
        const getAllCidadaoUseCase = new GetAllCidadaoUseCase()

        const result = await getAllCidadaoUseCase.execute()

        return res.status(200).json(result)
    }
}