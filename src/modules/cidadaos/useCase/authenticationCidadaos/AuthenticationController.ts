import { Request, Response } from "express";
import { AuthCidadaoUseCase } from "./AuthenticationUseCase";

export class AuthenticationController {
    async handle(req: Request, res: Response) {
        const { email, senha } = req.body

        const authCidadaoUseCase = new AuthCidadaoUseCase()

        const result = await authCidadaoUseCase.execute(
            {
                email,
                senha
            }
        )

        return res.cookie("token", result).status(200).json(result)
    }
}