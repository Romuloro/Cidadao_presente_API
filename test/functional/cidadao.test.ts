import supertest from 'supertest';
import { app } from '../../src/server';
import { cidadao_create_Mock } from '../../src/test/factories/cidadaoFactories';

const authAdmin = async () => {
  const result = await supertest(app).post('/cidadao/login').send({
    email: "rro_rodrigueso@teste.com",
    senha: "12345678!"
  })
  return result
}

const cidadaoMocked = cidadao_create_Mock

const cidadao_create_error_Mock = {
  name: "Élissa dos Santos de Oliveira",
  email: "elissasantoso@teste.com",
  celular: "219999999998",
  senha: "1245369hu",
  nick_name: "Nem_",
  sexo: "Feminino",
  role: "Organizadores"
}

const sutFactoryGetAll = async () => {
  const authResponse = await authAdmin()
  const cookie = await authResponse.get("Set-Cookie")
  const { body, status } = await supertest(app).get('/cidadao/').set('Cookie', cookie);
  return body;
};

const idMock = 'e20e492f-2e7d-4c05-bb19-84fff8abaa23';
const idErrorMock = '73dda17d-dd32-470a-8dde-b9518b4dcf1saidjaisjdipajd';

const sutFactoryGet = async () => {
  const authResponse = await authAdmin()
  const cookie = await authResponse.get("Set-Cookie")
  const { body, status } = await supertest(app).get(`/cidadao/${idMock}`).set('Cookie', cookie);
  return body;
};

describe('Get all cidadao route test', () => {
  it('should return an array with all citizens', async () => {
    const authResponse = await authAdmin()
    const cookie = await authResponse.get("Set-Cookie")
    const { body, status } = await supertest(app).get('/cidadao/').set('Cookie', cookie);
    const expectedGetall = await sutFactoryGetAll();
    expect(status).toEqual(200);
    expect(body).toEqual(expectedGetall);
  });
});

describe('Delete cidadao route test', () => {
  it('should delete an citizen in database', async () => {
    const authResponse = await authAdmin()
    const cookie = await authResponse.get("Set-Cookie")
    const { body, status } = await supertest(app).post(`/cidadao/`).set('Cookie', cookie).send(cidadao_create_Mock);
    const responseDelete = await supertest(app).delete(`/cidadao/${body.id}`).set('Cookie', cookie);
    expect(responseDelete.status).toEqual(200);
    expect(responseDelete.body).toEqual('');
  });

  it('should return error when an citizen does not exist', async () => {
    const authResponse = await authAdmin()
    const cookie = await authResponse.get("Set-Cookie")
    const { body, status } = await supertest(app).delete(
      `/cidadao/${idErrorMock}`).set('Cookie', cookie);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Cidadão does not exists'
    });
  });
});

describe('Update cidadao route test', () => {
  it('should update an citizen in database', async () => {
    const authResponse = await authAdmin()
    const cookie = await authResponse.get("Set-Cookie")
    const { body, status } = await supertest(app)
      .post(`/cidadao/`)
      .set('Cookie', cookie)
      .send(cidadao_create_Mock);
    const responseUpdate = await supertest(app).put(`/cidadao/${body.id}`).set('Cookie', cookie).send(cidadaoMocked);
    console.log(responseUpdate.body)
    expect(responseUpdate.status).toEqual(200);
    expect(responseUpdate.body).toEqual({
      id: body.id,
      name: cidadaoMocked.name,
      email: cidadaoMocked.email,
      celular: cidadaoMocked.celular,
      senha: responseUpdate.body.senha,
      nick_name: cidadaoMocked.nick_name,
      sexo: cidadaoMocked.sexo,
      role: cidadaoMocked.role,
      create_at: responseUpdate.body.create_at,
      updated_at: responseUpdate.body.updated_at,
    });

    await supertest(app).delete(`/cidadao/${body.id}`).set('Cookie', cookie);
  });

  it('should return error when an citizen does not exist', async () => {
    const authResponse = await authAdmin()
    const cookie = await authResponse.get("Set-Cookie")
    const { body, status } = await supertest(app).put(`/cidadao/${idErrorMock}`).set('Cookie', cookie).send(cidadao_create_Mock);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Cidadão does not exists'
    });
  });
});

describe('Get cidadao route test', () => {
  it('should return an citizen', async () => {
    const authResponse = await authAdmin()
    const cookie = await authResponse.get("Set-Cookie")
    const { body, status } = await supertest(app).get(`/cidadao/${idMock}`).set('Cookie', cookie);
    const expectedGet = await sutFactoryGet();
    expect(status).toEqual(200);
    expect(body).toEqual(expectedGet);
  });

  it('should return error when an citizen does not exist', async () => {
    const authResponse = await authAdmin()
    const cookie = await authResponse.get("Set-Cookie")
    const { body, status } = await supertest(app).get(`/cidadao/${idErrorMock}`).set('Cookie', cookie);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Cidadão does not exists'
    });
  });
});

describe('Create cidadao route test', () => {
  it('should return an citizen create', async () => {
    const authResponse = await authAdmin()
    const cookie = await authResponse.get("Set-Cookie")
    const { body, status } = await supertest(app)
      .post(`/cidadao/`)
      .set('Cookie', cookie)
      .send(cidadaoMocked);
    expect(status).toEqual(201);
    expect(body).toEqual({
      id: body.id,
      name: cidadaoMocked.name,
      email: cidadaoMocked.email,
      celular: cidadaoMocked.celular,
      senha: body.senha,
      nick_name: cidadaoMocked.nick_name,
      sexo: cidadaoMocked.sexo,
      role: cidadaoMocked.role,
      create_at: body.create_at,
      updated_at: body.updated_at,
    });

    await supertest(app).delete(`/cidadao/${body.id}`).set('Cookie', cookie);
  });

  it('should return error when an citizen already exist', async () => {
    const authResponse = await authAdmin()
    const cookie = await authResponse.get("Set-Cookie")
    const { body, status } = await supertest(app)
      .post(`/cidadao/`)
      .set('Cookie', cookie)
      .send(cidadao_create_error_Mock);
    expect(status).toEqual(401);
    expect(body).toEqual({
      message: 'Cidadão already exists'
    });
  });
});
