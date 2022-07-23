import { faker } from '@faker-js/faker';

export const Tipo = ["Infraestrutura", "Saude", "Poluicao", "Seguranca"]

export const comentario_create_Mock = {
    descricao: faker.commerce.productDescription(),
    titulo: faker.commerce.productDescription(),
    tipo: Tipo[Math.floor((Math.random() * Tipo.length))],
}