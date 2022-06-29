import supertest from 'supertest';
import { app } from '../../src/server';

const problema_create_Mock = {
  titulo: 'Rua sem Luz',
  descricao: "Local com pouco ou nenhum pavimento 'asfalto ou cimento'.",
  tipo: 'Infraestrutura',
};

const sutFactoryGetAll = async () => {
  const { body, status } = await supertest(app).get('/problema/');
  return body;
};

const idMock = 'c1b61b13-b06d-43aa-9dd9-74fe459f17b0';
const idErrorMock = '73dda17d-dd32-470a-8dde-b9518b4dcf1';

const sutFactoryGet = async () => {
  const { body, status } = await supertest(app).get(`/problema/${idMock}`);
  return body;
};

describe('Get all Problema route test', () => {
  it('should return an array with all problema of the citizens', async () => {
    const { body, status } = await supertest(app).get('/problema/');
    const expectedGetall = await sutFactoryGetAll();
    expect(status).toEqual(200);
    expect(body).toEqual(expectedGetall);
  });
});

describe('Delete Problema route test', () => {
  it('should delete an problema in database', async () => {
    const { body, status } = await supertest(app)
      .post(`/problema/`)
      .send(problema_create_Mock);
    const responseDelete = await supertest(app).delete(`/problema/${body.id}`);
    expect(responseDelete.status).toEqual(200);
    expect(responseDelete.body).toEqual('');
  });

  it('should return error when an problema does not exist', async () => {
    const { body, status } = await supertest(app).delete(
      `/problema/${idErrorMock}`
    );
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Problema does not exists',
      status: 'error',
    });
  });
});

describe('Update Problema route test', () => {
  it('should update an Problema in database', async () => {
    const { body, status } = await supertest(app)
      .post(`/problema/`)
      .send(problema_create_Mock);
    const responseUpdate = await await supertest(app)
      .put(`/problema/${body.id}`)
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

    await supertest(app).delete(`/problema/${body.id}`);
  });

  it('should return error when an problema does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/problema/${idErrorMock}`
    );
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Problema does not exists',
      status: 'error',
    });
  });
});

describe('Get Problema route test', () => {
  it('should return an problema in database', async () => {
    const { body, status } = await supertest(app).get(`/problema/${idMock}`);
    const expectedGet = await sutFactoryGet();
    expect(status).toEqual(200);
    expect(body).toEqual(expectedGet);
  });

  it('should return error when problema does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/problema/${idErrorMock}`
    );
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Problema does not exists',
      status: 'error',
    });
  });
});

describe('Create Problema route test', () => {
  it('should return an problema create', async () => {
    const { body, status } = await supertest(app)
      .post(`/problema/`)
      .send(problema_create_Mock);
    expect(status).toEqual(201);
    expect(body).toEqual({
      id: body.id,
      titulo: 'Rua sem Luz',
      descricao: "Local com pouco ou nenhum pavimento 'asfalto ou cimento'.",
      tipo: 'Infraestrutura',
    });

    await supertest(app).delete(`/problema/${body.id}`);
  });

  it('should return error when the problema does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/problema/${idErrorMock}`
    );
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Problema does not exists',
      status: 'error',
    });
  });
});
