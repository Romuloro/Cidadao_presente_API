import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import endpointsConfig from "../config/endpoints.config";
import { IdCidadaoDTO } from "../modules/cidadaos/dtos/IdCidadaoDTO";



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

    public static generateToken({ id }: IdCidadaoDTO) {
        return jwt.sign({ id }, endpointsConfig.AuthKey, {
            expiresIn: endpointsConfig.ExpiresIn,
        });
    }
}

