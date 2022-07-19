import { faker } from '@faker-js/faker';

export const roles = ["Admin", "Organizadores", "Cidadao"]
export const sexo = ["Masculino", "Feminino", "Nao_Declarado"]

export const cidadao_create_Mock = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    celular: faker.phone.number(),
    senha: faker.internet.password(),
    nick_name: faker.name.firstName(),
    sexo: sexo[Math.floor((Math.random() * sexo.length))],
    role: roles[Math.floor((Math.random() * sexo.length))],
}

