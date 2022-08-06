import supertest from 'supertest';
import { app } from '../../src/server';
import { post_create_Mock } from '../../src/test/factories/postFactories';

const postCreateMocked = post_create_Mock

let cookie: string[]

beforeEach(async () => {
  const result = await supertest(app).post('/cidadao/login').send({
    email: "rro_rodrigueso@teste.com",
    senha: "12345678!"
  })

  cookie = result.get("Set-Cookie")
})

const idMock = '9a7a7f6e-2a45-45a4-8a3f-452515bb6219';
const idErrorMock = '73dda17d-dd32-470a-8dde-b9518b4dcf1';

const authAdmin = async () => {
  const result = await supertest(app).post('/cidadao/login').send({
    email: "rro_rodrigueso@teste.com",
    senha: "12345678!"
  })
  return result
}

const sutFactoryGet = async () => {
  const authResponse = await authAdmin()
  const cookie = await authResponse.get("Set-Cookie")
  const { body, status } = await supertest(app).get(`/post/${idMock}`).set('Cookie', cookie);
  return body;
};

describe('Get all post route test', () => {
  it('should return an array with all post of the citizens', async () => {
    const { body, status } = await supertest(app).get('/post/').set('Cookie', cookie);
    expect(status).toEqual(200);
  });
});

describe('Delete post route test', () => {
  it('should delete an post of the citizen in database', async () => {
    const { body, status } = await supertest(app)
      .post(`/post/`)
      .set('Cookie', cookie)
      .send(postCreateMocked);
    const responseDelete = await supertest(app).delete(`/post/${body.id}`).set('Cookie', cookie);
    expect(responseDelete.status).toEqual(200);
    expect(responseDelete.body).toEqual('');
  });

  it('should return error when an post does not exist', async () => {
    const { body, status } = await supertest(app).delete(
      `/post/${idErrorMock}`
    ).set('Cookie', cookie);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Post does not exists'
    });
  });
});

describe('Update Post route test', () => {
  it('should update an post citizen in database', async () => {
    const { body, status } = await supertest(app)
      .post(`/post/`)
      .set('Cookie', cookie)
      .send(postCreateMocked);
    const responseUpdate = await await supertest(app)
      .put(`/post/${body.id}`)
      .set('Cookie', cookie)
      .send({
        anonimo: false,
        descricao:
          'Rua com muitos buracos e local totalmente abandonado com muito lixo e falta de iluminação.',
        status: 'Pendente',
        localidade_id: postCreateMocked.localidade_id,
        cidadao_id: postCreateMocked.cidadao_id,
        problemas_: ["fa98c4ff-76ac-4310-9e48-b0bd18ae1223", "e7d501fa-1455-4b6e-876a-be8ce18ff8c6"]
      });
    expect(responseUpdate.status).toEqual(200);
    expect(responseUpdate.body).toEqual({
      id: body.id,
      anonimo: false,
      descricao:
        'Rua com muitos buracos e local totalmente abandonado com muito lixo e falta de iluminação.',
      status: 'Pendente',
      localidade_id: responseUpdate.body.localidade_id,
      cidadao_id: responseUpdate.body.cidadao_id,
      create_at: responseUpdate.body.create_at,
      updated_at: responseUpdate.body.updated_at,
    });

    await supertest(app).delete(`/post/${body.id}`).set('Cookie', cookie);
  });

  it('should return error when an localidade connect of the post does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/localidade/${idErrorMock}`
    ).set('Cookie', cookie);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Localidade does not exists'
    });
  });

  it('should return error when an problema connect of the post does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/problema/${idErrorMock}`
    ).set("Cookie", cookie);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Problema does not exists'
    });
  });

  it('should return error when the citizen connect an post does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/cidadao/${idErrorMock}`
    ).set('Cookie', cookie);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Cidadão does not exists'
    });
  });

  it('should return error when the post does not exist', async () => {
    const { body, status } = await supertest(app).get(`/post/${idErrorMock}`).set('Cookie', cookie);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Post does not exists'
    });
  });
});

describe('Get post route test', () => {
  it('should return an post in database', async () => {
    const { body, status } = await supertest(app).get(`/post/${idMock}`).set('Cookie', cookie);
    const expectedGet = await sutFactoryGet();
    expect(status).toEqual(200);
    expect(body).toEqual(expectedGet);
  });

  it('should return error when post does not exist', async () => {
    const { body, status } = await supertest(app).get(`/post/${idErrorMock}`).set('Cookie', cookie);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Post does not exists'
    });
  });
});

describe('Create Post route test', () => {
  it('should return an comment of the citizen create', async () => {
    const { body, status } = await supertest(app)
      .post(`/post/`)
      .set('Cookie', cookie)
      .send(postCreateMocked);
    expect(status).toEqual(201);
    expect(body).toEqual({
      anonimo: postCreateMocked.anonimo,
      id: body.id,
      descricao: postCreateMocked.descricao,
      localidade_id: postCreateMocked.localidade_id,
      cidadao_id: postCreateMocked.cidadao_id,
      status: postCreateMocked.status
    });

    await supertest(app).delete(`/post/${body.id}`).set('Cookie', cookie);
  });

  it('should return error when the localização connect an post of the citizen does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/localidade/${idErrorMock}`
    ).set('Cookie', cookie);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Localidade does not exists'
    });
  });

  it('should return error when the citizen connect an post does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/cidadao/${idErrorMock}`
    ).set('Cookie', cookie);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Cidadão does not exists'
    });
  });
});
