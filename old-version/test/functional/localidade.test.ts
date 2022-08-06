import supertest from 'supertest';
import { app } from '../../src/server';
import { localidade_create_Mock } from '../../src/test/factories/localidadeFactories';

const localidadeCreateMocked =  localidade_create_Mock

let cookie: string[]

beforeEach(async () => {
  const result = await supertest(app).post('/cidadao/login').send({
    email: "rro_rodrigueso@teste.com",
    senha: "12345678!"
  })

  cookie = result.get("Set-Cookie")
})

const authAdmin = async () => {
  const result = await supertest(app).post('/cidadao/login').send({
    email: "rro_rodrigueso@teste.com",
    senha: "12345678!"
  })
  return result
}

const idMock = 'b84431ea-dc1c-4d1f-ab24-994531f04074';
const idErrorMock = '73dda17d-dd32-470a-8dde-b9518b4dcf1';

const sutFactoryGet = async () => {
  const authResponse = await authAdmin()
  const cookie = await authResponse.get("Set-Cookie")
  const { body, status } = await supertest(app).get(`/localidade/${idMock}`).set("Cookie", cookie);
  return body;
};

describe('Get all Localidade route test', () => {
  it('should return an array with all localidade in database', async () => {
    const { body, status } = await supertest(app).get('/localidade/').set("Cookie", cookie);
    expect(status).toEqual(200);
  });
});

describe('Delete Localidade route test', () => {
  it('should delete an localidade in database', async () => {
    const { body, status } = await supertest(app)
      .post(`/localidade/Romin_`)
      .set('Cookie', cookie)
      .send(localidadeCreateMocked);
    const responseDelete = await supertest(app).delete(
      `/localidade/${body.id}`
    ).set('Cookie', cookie);
    expect(responseDelete.status).toEqual(200);
    expect(responseDelete.body).toEqual('');
  });

  it('should return error when an localidade does not exist', async () => {
    const { body, status } = await supertest(app).delete(
      `/localidade/${idErrorMock}`
    ).set('Cookie', cookie);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Localidade does not exists'
    });
  });
});

describe('Update Localidade route test', () => {
  it('should update an localidade in database', async () => {
    const { body, status } = await supertest(app)
      .post(`/localidade/Nem_`)
      .set('Cookie', cookie)
      .send(localidadeCreateMocked);
    const responseUpdate = await await supertest(app)
      .put(`/localidade/${body.id}/Nem_`)
      .set('Cookie', cookie)
      .send({
        latitude: '14.859210S',
        longitude: '7.010251W',
        descricao:
          'Arsenal Avenida Doutor Eugênio Borges, altura da ponto de ônibus ao lado do shopping Via Lagos.!',
      });
    expect(responseUpdate.status).toEqual(200);
    expect(responseUpdate.body).toEqual({
      id: body.id,
      latitude: '14.859210S',
      longitude: '7.010251W',
      descricao:
        'Arsenal Avenida Doutor Eugênio Borges, altura da ponto de ônibus ao lado do shopping Via Lagos.!',
      create_at: responseUpdate.body.create_at,
      updated_at: responseUpdate.body.updated_at,
    });

    await supertest(app).delete(`/localidade/${body.id}`).set('Cookie', cookie);
  });

  it('should return error when an localidade does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/localidade/${idErrorMock}`
    ).set('Cookie', cookie);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Localidade does not exists'
    });
  });

  it('should return error when the citizen connect an localidade does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/cidadao/${idErrorMock}`
    ).set('Cookie', cookie);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Cidadão does not exists'
    });
  });
});

describe('Get Localidade route test', () => {
  it('should return an localidade in database', async () => {
    const { body, status } = await supertest(app).get(`/localidade/${idMock}`).set('Cookie', cookie);
    const expectedGet = await sutFactoryGet();
    expect(status).toEqual(200);
    expect(body).toEqual(expectedGet);
  });

  it('should return error when localidade does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/localidade/${idErrorMock}`
    ).set('Cookie', cookie);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Localidade does not exists'
    });
  });
});

describe('Create Localidade route test', () => {
  it('should return an comment of the citizen create', async () => {
    const { body, status } = await supertest(app)
      .post(`/localidade/Romin_`)
      .set('Cookie', cookie)
      .send(localidadeCreateMocked);
    expect(status).toEqual(201);
    expect(body).toEqual({
      id: body.id,
      latitude: localidadeCreateMocked.latitude,
      longitude: localidadeCreateMocked.longitude,
      descricao:
        localidadeCreateMocked.descricao,
      create_at: body.create_at,
      updated_at: body.updated_at,
    });

    await supertest(app).delete(`/localidade/${body.id}`).set('Cookie', cookie);
  });

  it('should return error when the citizen connect an localidade does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/cidadao/${idErrorMock}`
    ).set('Cookie', cookie);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Cidadão does not exists'
    });
  });

  it('should return error when the localidade does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/localidade/${idErrorMock}`
    ).set('Cookie', cookie);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Localidade does not exists'
    });
  });
});
