import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import AuthService from "../../../../services/auth";
import { AuthCidadaoDTO } from "../../dtos/AuthCidadaoDTO";

export class AuthCidadaoUseCase {
    async execute(
        {email,
            senha }: AuthCidadaoDTO
    ): Promise<string> {
        const cidadao = await prisma.cidadao.findUnique({
            where: { email }
        })

        if (!cidadao) {
            throw new AppError('Cidadão does not exist or invalid', 401);
        }

        if (!await AuthService.comparePasswords(senha, cidadao.senha)) {
            throw new AppError('Cidadão password invalid', 401);
        }

        const token = await AuthService.generateToken(cidadao.id)

        return token
    }
}