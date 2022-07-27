import { faker } from '@faker-js/faker';

export const localidade_create_Mock = {
    descricao: faker.commerce.productDescription(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    
}