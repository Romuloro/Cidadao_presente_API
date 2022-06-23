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

const cidadao_create_error_Mock = {
  "name": "Rômulo Rodrigues de Oliveira",
  "email": "romulo_rodrigues@teste.com",
  "celular": "21999999999",
  "senha": "12345678",
  "nick_name": "Romin_",
  "sexo": "Masculino"
}

const sutFactoryGetAll = async () => {
  const { body, status } = await supertest(app).get('/cidadao/');
  return body
}

const idMock = '73dda17d-dd32-470a-8dde-b9518b4dcf1a';
const idErrorMock = '73dda17d-dd32-470a-8dde-b9518b4dcf1';

const sutFactoryGet = async () => {
  const { body, status } = await supertest(app).get(`/cidadao/${idMock}`);
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

describe('Delete cidadao route test', () => {

  it('should delete an citizen in database', async () => {
    const { body, status } = await supertest(app).post(`/cidadao/`).send(cidadao_create_Mock);
    const responseDelete = await supertest(app).delete(`/cidadao/${body.id}`);
    expect(responseDelete.status).toEqual(200);
    expect(responseDelete.body).toEqual("");
  });

  it('should return error when an citizen does not exist', async () => {
    const { body, status } = await supertest(app).delete(`/cidadao/${idErrorMock}`);
    expect(status).toEqual(404);
    expect(body).toEqual({
      'message': 'Cidadão does not exists',
      'status': 'error'
    });
  });
});

describe('Update cidadao route test', () => {

  it('should update an citizen in database', async () => {
    const { body, status } = await supertest(app).post(`/cidadao/`).send(cidadao_create_Mock);
    const responseUpdate = await supertest(app).put(`/cidadao/${body.id}`);
    expect(responseUpdate.status).toEqual(200);
    expect(responseUpdate.body).toEqual({
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

  it('should return error when an citizen does not exist', async () => {
    const { body, status } = await supertest(app).put(`/cidadao/${idErrorMock}`);
    expect(status).toEqual(404);
    expect(body).toEqual({
      'message': 'Cidadão does not exists',
      'status': 'error'
    });
  });
});

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

  it('should return error when an citizen already exist', async () => {
    const { body, status } = await supertest(app).post(`/cidadao/`).send(cidadao_create_error_Mock);
    expect(status).toEqual(400);
    expect(body).toEqual({
      'message': 'Cidadão already exists',
      'status': 'error'
    });
  });
});