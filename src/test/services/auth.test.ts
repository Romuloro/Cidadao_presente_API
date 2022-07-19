import bcrypt from 'bcrypt';
import AuthService from '../../services/auth';
import { faker } from '@faker-js/faker';
import { Response } from "express";

const encryptPassword = async() =>{
    const senha = '1245678c'
    const encryptedPassword = await AuthService.hashPassword(senha)
    return [encryptedPassword, senha]
}

const id = "a5f45a7fasa456as468a7r684a56ws7ra4fd5a"

describe('hashPassword user password', () => {
    it('should return True if encrypt user password is correct', async () => {
        const [encryptedPassword, senha] = await encryptPassword()
        const compareHash = await bcrypt.compare(senha, encryptedPassword);

        expect(compareHash).toBe(true);
    });

    it('should return False if encrypt user password is wrong', async () => {
        const [encryptedPassword, senha] = await encryptPassword()

        const compareHash = await bcrypt.compare(senha, faker.internet.password());

        expect(compareHash).toBe(false);
    });
})

describe('comparePasswords user password', () => {
    it('should return True if encrypt user password is correct', async () => {
        const [encryptedPassword, senha] = await encryptPassword()

        const compareHash = await AuthService.comparePasswords(senha, encryptedPassword)

        expect(compareHash).toBe(true);
    });

    it('should return False if encrypt user password is wrong', async () => {
        const [encryptedPassword, senha] = await encryptPassword()

        const compareHash = await AuthService.comparePasswords(faker.internet.password(), encryptedPassword)

        expect(compareHash).toBe(false);
    });
})