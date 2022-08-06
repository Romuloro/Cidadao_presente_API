import { faker } from '@faker-js/faker';

export const comentarioTipo = ["Positivo", "Negativo"]

export const comentario_create_Mock = {
    descricao: faker.commerce.productDescription(),
    cidadao_id: "bfc65374-7ad5-455f-9b5c-0f5926cf95cb",
    post_id: "3ac779b6-6315-4ada-9eae-7c8cd8844717",
    tipo: comentarioTipo[Math.floor((Math.random() * comentarioTipo.length))],
}