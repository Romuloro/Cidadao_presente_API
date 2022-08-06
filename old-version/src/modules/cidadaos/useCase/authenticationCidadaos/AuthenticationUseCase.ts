import { Response } from "express";
import { prisma } from "../../../../prisma/client";
import AuthService from "../../../../services/auth";
import { AuthCidadaoDTO } from "../../dtos/AuthCidadaoDTO";

export class AuthCidadaoUseCase {
    async execute(
        {
            email,
            senha
        }: AuthCidadaoDTO, res: Response
    ) {
        const cidadao = await prisma.cidadao.findUnique({
            where: { email }
        })

        if (!cidadao) {
            return res.status(401).json({ message: "Cidadão does not exist or invalid" })
        }

        if (!await AuthService.comparePasswords(senha, cidadao.senha)) {
            return res.status(401).json({ message: "Cidadão password invalid" })
        }

        const user = cidadao.nick_name
        const token = await AuthService.generateToken(cidadao.id, cidadao.role)

        const result = {
            token: token,
            user: user
        }

        return result
    }
}