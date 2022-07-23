import { faker } from '@faker-js/faker';

export const comentarioTipo = ["Positivo", "Negativo"]

export const comentario_create_Mock = {
    descricao: faker.commerce.productDescription(),
    cidadao_id: "bfc65374-7ad5-455f-9b5c-0f5926cf95cb",
    post_id: "a02c59ed-79cf-4332-98bb-de04b3f4ed07",
    tipo: comentarioTipo[Math.floor((Math.random() * comentarioTipo.length))],
}