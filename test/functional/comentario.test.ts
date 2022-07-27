import { Response } from 'superagent';
import supertest from 'supertest';
import { app } from '../../src/server';
import { comentario_create_Mock } from '../../src/test/factories/comentarioFactories';

const comentarioCreateMocked = comentario_create_Mock

const authAdmin = async () => {
  const result = await supertest(app).post('/cidadao/login').send({
    email: "rro_rodrigueso@teste.com",
    senha: "12345678!"
  })
  return result
}

const sutFactoryGetAll = async () => {
  const authResponse = await authAdmin()
  const cookie = await authResponse.get("Set-Cookie")
  const { body, status } = await supertest(app).get('/comentario/').set("Cookie", cookie);
  return body;
};

const idMock = '341973f1-c49b-437c-8d73-99a109291f08';
const idErrorMock = '73dda17d-dd32-470a-8dde-b9518b4dcf1';

const sutFactoryGet = async () => {
  const authResponse = await authAdmin()
  const cookie = await authResponse.get("Set-Cookie")
  const { body, status } = await supertest(app).get(`/comentario/${idMock}`).set('Cookie', cookie);
  return body;
};

let cookie:string[]

beforeEach(async () => {
  const result = await supertest(app).post('/cidadao/login').send({
    email: "rro_rodrigueso@teste.com",
    senha: "12345678!"
  })

  cookie = result.get("Set-Cookie")
})

describe('Get all comentário route test', () => {

  it('should return an array with all talks of the citizens', async () => {
    const authCookie = await supertest(app).get('/comentario/').set("Cookie", cookie)
    const expectedGetall = await sutFactoryGetAll();
    expect(authCookie.status).toEqual(200);
    expect(authCookie.body).toEqual(expectedGetall);
  });
});

describe('Delete comentário route test', () => {
  it('should delete an comment of the citizen in database', async () => {
    const { body, status } = await supertest(app)
      .post(`/comentario/`)
      .set('Cookie', cookie)
      .send(comentarioCreateMocked);
    const responseDelete = await supertest(app).delete(
      `/comentario/${body.id}`
    ).set('Cookie', cookie);
    expect(responseDelete.status).toEqual(200);
    expect(responseDelete.body).toEqual('');
  });

  it('should return error when an comment of the citizen does not exist', async () => {

    const { body, status } = await supertest(app).delete(
      `/comentario/${idErrorMock}`
    ).set("Cookie", cookie);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Comentário does not exists'
    });
  });
});

describe('Update comentário route test', () => {
  it('should update an comment citizen in database', async () => {
    const { body, status } = await supertest(app)
      .post(`/comentario/`)
      .set('Cookie', cookie)
      .send(comentarioCreateMocked);
    const responseUpdate = await await supertest(app)
      .put(`/comentario/${body.id}`)
      .set('Cookie', cookie)
      .send(comentarioCreateMocked);
    expect(responseUpdate.status).toEqual(200);
    expect(responseUpdate.body).toEqual({
      id: body.id,
      descricao: comentarioCreateMocked.descricao,
      tipo: comentarioCreateMocked.tipo,
      cidadao_id: comentarioCreateMocked.cidadao_id,
      post_id: comentarioCreateMocked.post_id,
      create_at: responseUpdate.body.create_at,
      updated_at: responseUpdate.body.updated_at,
    });

    await supertest(app).delete(`/comentario/${body.id}`).set('Cookie', cookie);
  });

  it('should return error when an comment of the citizen does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/comentario/${idErrorMock}`
    ).set('Cookie', cookie);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Comentário does not exists'
    });
  });

  it('should return error when the post connect an comment of the citizen does not exist', async () => {
    const { body, status } = await supertest(app).get(`/post/${idErrorMock}`).set('Cookie', cookie);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Post does not exists',
    });
  });

  it('should return error when the citizen connect an comment does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/cidadao/${idErrorMock}`
    ).set('Cookie', cookie);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Cidadão does not exists'
    });
  });
});

describe('Get comentário route test', () => {
  it('should return an comment of the citizen', async () => {
    const { body, status } = await supertest(app).get(`/comentario/${idMock}`).set('Cookie', cookie);
    const expectedGet = await sutFactoryGet();
    expect(status).toEqual(200);
    expect(body).toEqual(expectedGet);
  });

  it('should return error when an comment does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/comentario/${idErrorMock}`
    ).set('Cookie', cookie);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Comentário does not exists'
    });
  });
});

describe('Create comentário route test', () => {
  it('should return an comment of the citizen create', async () => {
    const { body, status } = await supertest(app)
      .post(`/comentario/`)
      .set('Cookie', cookie)
      .send(comentarioCreateMocked);
    expect(status).toEqual(201);
    expect(body).toEqual({
      id: body.id,
      descricao: comentarioCreateMocked.descricao,
      tipo: comentarioCreateMocked.tipo,
      cidadao_id: comentarioCreateMocked.cidadao_id,
      post_id: comentarioCreateMocked.post_id,
      create_at: body.create_at,
      updated_at: body.updated_at,
    });

    await supertest(app).delete(`/comentario/${body.id}`).set('Cookie', cookie);
  });

  it('should return error when the post connect an comment of the citizen does not exist', async () => {
    const { body, status } = await supertest(app).get(`/post/${idErrorMock}`).set('Cookie', cookie);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Post does not exists'
    });
  });

  it('should return error when the citizen connect an comment does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/cidadao/${idErrorMock}`
    ).set('Cookie', cookie);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Cidadão does not exists'
    });
  });
});
