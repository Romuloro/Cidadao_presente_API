import supertest from 'supertest';
import { app } from '../../src/server';

const post_create_Mock = {
  anonimo: true,
  descricao:
    'Rua com muitos buracos e local totalmente abandonado com muito lixo e falta de iluminação.',
  status: 'Pendente',
  localidade_id: 'e56a6384-46ec-44c0-b614-1e77f32c3379',
  cidadao_id: '73dda17d-dd32-470a-8dde-b9518b4dcf1a',
  problemas_: 'ec19a31f-9564-47cc-aff8-a82d82a9bca0',
};

const sutFactoryGetAll = async () => {
  const { body, status } = await supertest(app).get('/post/');
  return body;
};

const idMock = 'a02c59ed-79cf-4332-98bb-de04b3f4ed07';
const idErrorMock = '73dda17d-dd32-470a-8dde-b9518b4dcf1';

const sutFactoryGet = async () => {
  const { body, status } = await supertest(app).get(`/post/${idMock}`);
  return body;
};

describe('Get all post route test', () => {
  it('should return an array with all post of the citizens', async () => {
    const { body, status } = await supertest(app).get('/post/');
    const expectedGetall = await sutFactoryGetAll();
    expect(status).toEqual(200);
    expect(body).toEqual(expectedGetall);
  });
});

describe('Delete post route test', () => {
  it('should delete an post of the citizen in database', async () => {
    const { body, status } = await supertest(app)
      .post(`/post/`)
      .send(post_create_Mock);
    const responseDelete = await supertest(app).delete(`/post/${body.id}`);
    expect(responseDelete.status).toEqual(200);
    expect(responseDelete.body).toEqual('');
  });

  it('should return error when an post does not exist', async () => {
    const { body, status } = await supertest(app).delete(
      `/post/${idErrorMock}`
    );
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Post does not exists',
      status: 'error',
    });
  });
});

describe('Update Post route test', () => {
  it('should update an post citizen in database', async () => {
    const { body, status } = await supertest(app)
      .post(`/post/`)
      .send(post_create_Mock);
    const responseUpdate = await await supertest(app)
      .put(`/post/${body.id}`)
      .send({
        anonimo: false,
        descricao:
          'Rua com muitos buracos e local totalmente abandonado com muito lixo e falta de iluminação.',
        status: 'Pendente',
        localidade_id: 'e56a6384-46ec-44c0-b614-1e77f32c3379',
        cidadao_id: '73dda17d-dd32-470a-8dde-b9518b4dcf1a',
        problemas_: 'ec19a31f-9564-47cc-aff8-a82d82a9bca0',
      });
    expect(responseUpdate.status).toEqual(200);
    expect(responseUpdate.body).toEqual({
      id: body.id,
      anonimo: false,
      descricao:
        'Rua com muitos buracos e local totalmente abandonado com muito lixo e falta de iluminação.',
      status: 'Pendente',
      localidade_id: 'e56a6384-46ec-44c0-b614-1e77f32c3379',
      cidadao_id: '73dda17d-dd32-470a-8dde-b9518b4dcf1a',
      create_at: responseUpdate.body.create_at,
      updated_at: responseUpdate.body.updated_at,
    });

    await supertest(app).delete(`/post/${body.id}`);
  });

  it('should return error when an localidade connect of the post does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/localidade/${idErrorMock}`
    );
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Localidade does not exists',
      status: 'error',
    });
  });

  it('should return error when an problema connect of the post does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/problema/${idErrorMock}`
    );
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Problema does not exists',
      status: 'error',
    });
  });

  it('should return error when the citizen connect an post does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/cidadao/${idErrorMock}`
    );
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Cidadão does not exists',
      status: 'error',
    });
  });

  it('should return error when the post does not exist', async () => {
    const { body, status } = await supertest(app).get(`/post/${idErrorMock}`);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Post does not exists',
      status: 'error',
    });
  });
});

describe('Get post route test', () => {
  it('should return an post in database', async () => {
    const { body, status } = await supertest(app).get(`/post/${idMock}`);
    const expectedGet = await sutFactoryGet();
    expect(status).toEqual(200);
    expect(body).toEqual(expectedGet);
  });

  it('should return error when post does not exist', async () => {
    const { body, status } = await supertest(app).get(`/post/${idErrorMock}`);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Post does not exists',
      status: 'error',
    });
  });
});

describe('Create Post route test', () => {
  it('should return an comment of the citizen create', async () => {
    const { body, status } = await supertest(app)
      .post(`/post/`)
      .send(post_create_Mock);
    expect(status).toEqual(201);
    expect(body).toEqual({
      anonimo: true,
      id: body.id,
      descricao:
        'Rua com muitos buracos e local totalmente abandonado com muito lixo e falta de iluminação.',
      status: 'Pendente',
      localidade_id: 'e56a6384-46ec-44c0-b614-1e77f32c3379',
      cidadao_id: '73dda17d-dd32-470a-8dde-b9518b4dcf1a',
    });

    await supertest(app).delete(`/post/${body.id}`);
  });

  it('should return error when the localização connect an post of the citizen does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/localidade/${idErrorMock}`
    );
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Localidade does not exists',
      status: 'error',
    });
  });

  it('should return error when the citizen connect an post does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/cidadao/${idErrorMock}`
    );
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Cidadão does not exists',
      status: 'error',
    });
  });
});
