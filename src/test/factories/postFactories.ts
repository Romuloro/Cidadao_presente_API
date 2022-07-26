import { faker } from '@faker-js/faker';

export const anonimo = [true, false]
export const status = ["Resolvido", "Pendente"]

export const post_create_Mock = {
    descricao: faker.commerce.productDescription(),
    cidadao_id: "bfc65374-7ad5-455f-9b5c-0f5926cf95cb",
    localidade_id: "b84431ea-dc1c-4d1f-ab24-994531f04074",
    problemas_: ["fa98c4ff-76ac-4310-9e48-b0bd18ae1223", "e7d501fa-1455-4b6e-876a-be8ce18ff8c6"],
    anonimo: anonimo[Math.floor((Math.random() * anonimo.length))],
    status: status[Math.floor((Math.random() * status.length))],
}