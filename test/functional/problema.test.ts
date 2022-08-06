import supertest from 'supertest';
import { app } from '../../src/server';
import { problema_create_Mock } from '../../src/test/factories/problemaFactories';

const problemaCreateMocked = problema_create_Mock

const authAdmin = async () => {
  const result = await supertest(app).post('/cidadao/login').send({
    email: "rro_rodrigueso@teste.com",
    senha: "12345678!"
  })
  return result
}

let cookie: string[]

beforeEach(async () => {
  const result = await supertest(app).post('/cidadao/login').send({
    email: "rro_rodrigueso@teste.com",
    senha: "12345678!"
  })

  cookie = result.get("Set-Cookie")
})

const idMock = 'fa98c4ff-76ac-4310-9e48-b0bd18ae1223';
const idErrorMock = '73dda17d-dd32-470a-8dde-b9518b4dcf1';

const sutFactoryGet = async () => {
  const authResponse = await authAdmin()
  const cookie = await authResponse.get("Set-Cookie")
  const { body, status } = await supertest(app).get(`/problema/${idMock}`).set('Cookie', cookie);
  return body;
};

describe('Get all Problema route test', () => {
  it('should return an array with all problema of the citizens', async () => {
    const { body, status } = await supertest(app).get('/problema/').set('Cookie', cookie);
    expect(status).toEqual(200);
  });
});

describe('Delete Problema route test', () => {
  it('should delete an problema in database', async () => {
    const { body, status } = await supertest(app)
      .post(`/problema/`)
      .set('Cookie', cookie)
      .send(problema_create_Mock);
    const responseDelete = await supertest(app).delete(`/problema/${body.id}`).set('Cookie', cookie);
    expect(responseDelete.status).toEqual(200);
    expect(responseDelete.body).toEqual('');
  });

  it('should return error when an problema does not exist', async () => {
    const { body, status } = await supertest(app).delete(
      `/problema/${idErrorMock}`
    ).set('Cookie', cookie);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Problema does not exists'
    });
  });
});

describe('Update Problema route test', () => {
  it('should update an Problema in database', async () => {
    const { body, status } = await supertest(app)
      .post(`/problema/`)
      .set('Cookie', cookie)
      .send(problemaCreateMocked);
    const responseUpdate = await await supertest(app)
      .put(`/problema/${body.id}`)
      .set('Cookie', cookie)
      .send({
        titulo: 'Rua sem Luz',
        descricao: "Local com pouco ou nenhum pavimento 'asfalto ou cimento'.",
        tipo: 'Saude',
      });
    expect(responseUpdate.status).toEqual(200);
    expect(responseUpdate.body).toEqual({
      id: body.id,
      titulo: 'Rua sem Luz',
      descricao: "Local com pouco ou nenhum pavimento 'asfalto ou cimento'.",
      tipo: 'Saude',
      create_at: responseUpdate.body.create_at,
      updated_at: responseUpdate.body.updated_at,
    });

    await supertest(app).delete(`/problema/${body.id}`).set('Cookie', cookie);
  });

  it('should return error when an problema does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/problema/${idErrorMock}`
    ).set('Cookie', cookie);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Problema does not exists'
    });
  });
});

describe('Get Problema route test', () => {
  it('should return an problema in database', async () => {
    const { body, status } = await supertest(app).get(`/problema/${idMock}`).set('Cookie', cookie);
    const expectedGet = await sutFactoryGet();
    expect(status).toEqual(200);
    expect(body).toEqual(expectedGet);
  });

  it('should return error when problema does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/problema/${idErrorMock}`
    ).set('Cookie', cookie);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Problema does not exists'
    });
  });
});

describe('Create Problema route test', () => {
  it('should return an problema create', async () => {
    const { body, status } = await supertest(app)
      .post(`/problema/`)
      .set('Cookie', cookie)
      .send(problema_create_Mock);
    expect(status).toEqual(201);
    expect(body).toEqual({
      id: body.id,
      titulo: problema_create_Mock.titulo,
      descricao: problema_create_Mock.descricao,
      tipo: problema_create_Mock.tipo,
    });

    await supertest(app).delete(`/problema/${body.id}`).set('Cookie', cookie);
  });

  it('should return error when the problema does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/problema/${idErrorMock}`
    ).set('Cookie', cookie);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Problema does not exists'
    });
  });
});
