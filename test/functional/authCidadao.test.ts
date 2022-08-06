import supertest from 'supertest';
import bcrypt from 'bcrypt';
import { app } from '../../src/server';
import { cidadao_create_Mock } from '../../src/test/factories/cidadaoFactories';

const authAdmin = async () => {
    const result = await supertest(app).post('/cidadao/login').send({
        email: "rro_rodrigueso@teste.com",
        senha: "12345678!"
    })
    return result
}

describe('Cidadao in Login Route', () => {
    it('should return token when login is successful', async () => {
        const authResponse = await authAdmin()
        expect(authResponse.statusCode).toBe(200)
        expect(authResponse.body).toHaveProperty('token')
    })

    it('should return error message when email is wrong in login', async () => {
        const result = await supertest(app).post('/cidadao/login').send({
            email: "rro_rodriguesoL@teste.com",
            senha: "12345678!"
        })
        expect(result.statusCode).toBe(401)
        expect(result.body).toEqual({ message: "Cidadão does not exist or invalid" })
    })

    it('should return error message when senha is wrong in login', async () => {
        const result = await supertest(app).post('/cidadao/login').send({
            email: "rro_rodrigueso@teste.com",
            senha: "12345678!#"
        })
        expect(result.statusCode).toBe(401)
        expect(result.body).toEqual({ message: "Cidadão password invalid" })
    })
})

describe('hashPassword user password', () => {
    it('should return True if encrypt user password is correct', async () => {
        const authResponse = await authAdmin()
        const cookie = await authResponse.get("Set-Cookie")
        const result = await supertest(app).post(`/cidadao/`).set('Cookie', cookie).send(cidadao_create_Mock);
        const compareHash = await bcrypt.compare(cidadao_create_Mock.senha, result.body.senha);
        expect(compareHash).toBe(true);
        await supertest(app).delete(`/cidadao/${result.body.id}`).set('Cookie', cookie);
    });
})