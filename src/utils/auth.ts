import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import AuthService from "../services/auth";

export class AuthToken{
    async execute(req: Request, res: Response, next: NextFunction){
        const token = req.cookies.token
        if (!token){
            return res.status(401).json({ error: "Cidadão não contém um token presente" })
        }

        await AuthService.verifyToken(token, res)
        next()
    }
}