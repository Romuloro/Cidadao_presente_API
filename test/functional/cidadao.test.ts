import supertest from 'supertest';
import { app } from '../../src/server';

const cidadao_create_Mock = {
  "name": "Teste Create",
  "email": "test_03@teste.com",
  "celular": "219999999975",
  "senha": "12345678",
  "nick_name": "Teste_nick3",
  "sexo": "Masculino"
}

const sutFactoryGetAll = async () => {
  const { body, status } = await supertest(app).get('/cidadao/');
  return body
}

const idDeleteMock = 'e1e1e071-3f4a-4570-9184-1b89e12cce3e'
const idMock = '73dda17d-dd32-470a-8dde-b9518b4dcf1a';
const idErrorMock = '73dda17d-dd32-470a-8dde-b9518b4dcf1';

const sutFactoryGet = async () => {
  const { body, status } = await supertest(app).get(`/cidadao/${idMock}`);
  return body
}

const sutFactoryCreate = async () => {
  const { body, status } = await supertest(app).post(`/cidadao/`);
  return body
}

describe('Get all cidadao route test', () => {
  it('should return an array with all citizens', async () => {
    const { body, status } = await supertest(app).get('/cidadao/');
    const expectedGetall = await sutFactoryGetAll()
    expect(status).toEqual(200);
    expect(body).toEqual(expectedGetall);
  });
});

/* describe('Delete cidadao route test', () => {
  it('should return an array with all citizens', async () => {
    const { body, status } = await supertest(app).get('/cidadao/');
    const expectedGetall = await sutFactoryGetAll()
    expect(status).toEqual(200);
    expect(body).toEqual(expectedGetall);
  });
}); */

describe('Get cidadao route test', () => {

  it('should return an citizen', async () => {
    const { body, status } = await supertest(app).get(`/cidadao/${idMock}`);
    const expectedGet = await sutFactoryGet()
    expect(status).toEqual(200);
    expect(body).toEqual(expectedGet);
  });

  it('should return error when an citizen does not exist', async () => {
    const { body, status } = await supertest(app).get(`/cidadao/${idErrorMock}`);
    expect(status).toEqual(404);
    expect(body).toEqual({
      'message': 'Cidadão does not exists',
      'status': 'error'
    });
  });
});

describe('Create cidadao route test', () => {

  it('should return an citizen create', async () => {
    const { body, status } = await supertest(app).post(`/cidadao/`).send(cidadao_create_Mock);
    expect(status).toEqual(201);
    expect(body).toEqual({
      "id": body.id,
      "name": "Teste Create",
      "email": "test_03@teste.com",
      "celular": "219999999975",
      "senha": "12345678",
      "nick_name": "Teste_nick3",
      "sexo": "Masculino",
      "create_at": body.create_at,
      "updated_at": body.updated_at
    });

    const deleteCidadaoMock = await supertest(app).delete(`/cidadao/${body.id}`)
  });

  /* it('should return error when an citizen does not exist', async () => {
    const { body, status } = await supertest(app).post(`/cidadao/${idErrorMock}`);
    expect(status).toEqual(404);
    expect(body).toEqual({
      'message': 'Cidadão does not exists',
      'status': 'error'
    });
  }); */
});