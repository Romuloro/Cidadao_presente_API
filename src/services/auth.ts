import bcrypt from "bcrypt";
import { Response } from "express";
import jwt from "jsonwebtoken";
import endpointsConfig from "../config/endpoints.config";

export default class AuthService {
    public static async hashPassword(
        password: string,
        salt = 10
    ): Promise<string> {
        return await bcrypt.hash(password, salt);
    }

    public static async comparePasswords(
        password: string,
        hashedPassword: string
    ): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

    public static generateToken(id: string, role: string): string {
        return jwt.sign({ id, role }, endpointsConfig.AuthKey, {
            expiresIn: endpointsConfig.ExpiresIn,
        });
    }

    public static verifyToken(token: string, res: Response): any {
        const decoded = jwt.verify(token, endpointsConfig.AuthKey, (err, result) => {
            if (err)
                return res.status(500).json({ error: "Token Inválido" })
        })
        return decoded;
    }

    public static verifyTokenRole(token: string, res: Response): any {
        const decoded_payload = jwt.decode(token, { json: true })
        if (!decoded_payload){
            return res.status(500).json({ error: "Token Inválido" })
        }
        return decoded_payload.role;
    }
}

