import supertest from 'supertest';
import { app } from '../../src/server';

describe('Beach forecast functional tests', () => {
  it('should return a forecast with just a few times', async () => {
    const { body, status } = await supertest(app).get('/cidadao/');
    expect(status).toEqual(200);
    expect(body).toEqual([
      {
        id: '73dda17d-dd32-470a-8dde-b9518b4dcf1a',
        name: 'Rômulo Rodrigues de Oliveira',
        email: 'romulo_rodrigues@teste.com',
        celular: '21999999999',
        senha: '12345678',
        nick_name: 'Romin_',
        sexo: 'Masculino',
        create_at: '2022-06-20T20:47:39.712Z',
        updated_at: '2022-06-20T20:54:33.185Z',
      },
      {
        id: 'bb240b72-8a98-453a-b030-f92154318076',
        name: 'Élissa Santos de Oliveira',
        email: 'elissa_santos@teste.com',
        celular: '21999999998',
        senha: '12345678',
        nick_name: 'Lise_',
        sexo: 'Feminino',
        create_at: '2022-06-20T21:06:12.005Z',
        updated_at: '2022-06-20T21:06:12.005Z',
      },
      {
        id: '69572845-2679-4e80-8971-4b647f47adb6',
        name: 'Julio Cesar',
        email: 'julio_cesar@teste.com',
        celular: '21999999997',
        senha: '12345678',
        nick_name: 'Julinho',
        sexo: 'Masculino',
        create_at: '2022-06-20T21:42:53.644Z',
        updated_at: '2022-06-20T21:42:53.670Z',
      },
    ]);
  });
});
