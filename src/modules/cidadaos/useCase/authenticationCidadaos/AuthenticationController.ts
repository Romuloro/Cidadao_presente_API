import { Request, Response } from "express";
import { AuthCidadaoUseCase } from "./AuthenticationUseCase";

export class AuthenticationController {
    async handle(req: Request, res: Response) {
        const { email, senha } = req.body

        const authCidadaoUseCase = new AuthCidadaoUseCase()

        const result = await authCidadaoUseCase.execute({email, senha}, res)

        return res.cookie("token", result, { maxAge: 24 * 60 * 60 * 1000 }).status(200).json()
    }
}