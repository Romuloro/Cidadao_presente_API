import { NextFunction, Request, Response } from "express";
import AuthService from "../services/auth";

export class Auth{
    async token(req: Request, res: Response, next: NextFunction){
        const token = req.cookies.token
        if (!token){
            return res.status(401).json({ error: "Cidadão não contém um token presente" })
        }

        await AuthService.verifyToken(token, res)
        next()
    }

    role = (allowedRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ error: "Cidadão não contém um token presente" })
        }

        const role = await AuthService.verifyTokenRole(token, res)

        const allowed = allowedRoles.includes(role)
        if (!allowed) {
            return res.status(403).json({ error: "Cidadão não tem permissão para acessar este conteúdo"})
        }
        next()
    }
}