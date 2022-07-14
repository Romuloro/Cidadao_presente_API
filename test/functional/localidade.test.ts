import supertest from 'supertest';
import { app } from '../../src/server';

const localidade_create_Mock = {
  latitude: '2.859210S',
  longitude: '4.010251W',
  descricao:
    'Arsenal Avenida Doutor Eugênio Borges, altura da ponto de ônibus ao lado do shopping Via Lagos.',
};

const localidade_update_Mock = {
  latitude: '14.859210S',
  longitude: '7.010251W',
  descricao:
    'Arsenal Avenida Doutor Eugênio Borges, altura da ponto de ônibus ao lado do shopping Via Lagos.',
};

const sutFactoryGetAll = async () => {
  const { body, status } = await supertest(app).get('/localidade/');
  return body;
};

const idMock = '52c52adb-1bd0-4717-a70d-11768cc318d9';
const idErrorMock = '73dda17d-dd32-470a-8dde-b9518b4dcf1';

const sutFactoryGet = async () => {
  const { body, status } = await supertest(app).get(`/localidade/${idMock}`);
  return body;
};

describe('Get all Localidade route test', () => {
  it('should return an array with all localidade in database', async () => {
    const { body, status } = await supertest(app).get('/localidade/');
    const expectedGetall = await sutFactoryGetAll();
    expect(status).toEqual(200);
    expect(body).toEqual(expectedGetall);
  });
});

describe('Delete Localidade route test', () => {
  it('should delete an localidade in database', async () => {
    const { body, status } = await supertest(app)
      .post(`/localidade/Romin_`)
      .send(localidade_create_Mock);
    const responseDelete = await supertest(app).delete(
      `/localidade/${body.id}`
    );
    expect(responseDelete.status).toEqual(200);
    expect(responseDelete.body).toEqual('');
  });

  it('should return error when an localidade does not exist', async () => {
    const { body, status } = await supertest(app).delete(
      `/localidade/${idErrorMock}`
    );
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Localidade does not exists'
    });
  });
});

describe('Update Localidade route test', () => {
  it('should update an localidade in database', async () => {
    const { body, status } = await supertest(app)
      .post(`/localidade/Lise_`)
      .send(localidade_update_Mock);
    const responseUpdate = await await supertest(app)
      .put(`/localidade/${body.id}/Lise_`)
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

    await supertest(app).delete(`/localidade/${body.id}`);
  });

  it('should return error when an localidade does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/localidade/${idErrorMock}`
    );
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Localidade does not exists'
    });
  });

  it('should return error when the citizen connect an localidade does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/cidadao/${idErrorMock}`
    );
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Cidadão does not exists'
    });
  });
});

describe('Get Localidade route test', () => {
  it('should return an localidade in database', async () => {
    const { body, status } = await supertest(app).get(`/localidade/${idMock}`);
    const expectedGet = await sutFactoryGet();
    expect(status).toEqual(200);
    expect(body).toEqual(expectedGet);
  });

  it('should return error when localidade does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/localidade/${idErrorMock}`
    );
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
      .send(localidade_create_Mock);
    expect(status).toEqual(201);
    expect(body).toEqual({
      id: body.id,
      latitude: '2.859210S',
      longitude: '4.010251W',
      descricao:
        'Arsenal Avenida Doutor Eugênio Borges, altura da ponto de ônibus ao lado do shopping Via Lagos.',
      create_at: body.create_at,
      updated_at: body.updated_at,
    });

    await supertest(app).delete(`/localidade/${body.id}`);
  });

  it('should return error when the citizen connect an localidade does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/cidadao/${idErrorMock}`
    );
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Cidadão does not exists'
    });
  });

  it('should return error when the localidade does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/localidade/${idErrorMock}`
    );
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Localidade does not exists'
    });
  });
});
