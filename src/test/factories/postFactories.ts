import { faker } from '@faker-js/faker';

export const anonimo = [true, false]

export const post_create_Mock = {
    descricao: faker.commerce.productDescription(),
    cidadao_id: "bfc65374-7ad5-455f-9b5c-0f5926cf95cb",
    localidade_id: "b84431ea-dc1c-4d1f-ab24-994531f04074",
    anonimo: anonimo[Math.floor((Math.random() * anonimo.length))],
}