import supertest from 'supertest';
import { app } from '../../src/server';

const comentario_create_Mock = {
  descricao: 'Concordo muito! Lá está com um cheiro muito ruim e inseguro.',
  tipo: 'Positivo',
  cidadao_id: '69572845-2679-4e80-8971-4b647f47adb6',
  post_id: 'a02c59ed-79cf-4332-98bb-de04b3f4ed07',
};

const cidadao_create_error_Mock = {
  name: 'Rômulo Rodrigues de Oliveira',
  email: 'romulo_rodrigues@teste.com',
  celular: '21999999999',
  senha: '12345678',
  nick_name: 'Romin_',
  sexo: 'Masculino',
};

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

const idMock = '7bdfb075-b556-425e-a393-f20957e6cd78';
const idErrorMock = '73dda17d-dd32-470a-8dde-b9518b4dcf1';

const sutFactoryGet = async () => {
  const { body, status } = await supertest(app).get(`/comentario/${idMock}`);
  return body;
};

describe('Get all comentário route test', () => {
  it('should return an array with all talks of the citizens', async () => {
    const { body, status } = await supertest(app).get('/comentario/');
    const expectedGetall = await sutFactoryGetAll();
    expect(status).toEqual(200);
    expect(body).toEqual(expectedGetall);
  });
});

describe('Delete comentário route test', () => {
  it('should delete an comment of the citizen in database', async () => {
    const { body, status } = await supertest(app)
      .post(`/comentario/`)
      .send(comentario_create_Mock);
    const responseDelete = await supertest(app).delete(
      `/comentario/${body.id}`
    );
    expect(responseDelete.status).toEqual(200);
    expect(responseDelete.body).toEqual('');
  });

  it('should return error when an comment of the citizen does not exist', async () => {
    const { body, status } = await supertest(app).delete(
      `/comentario/${idErrorMock}`
    );
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
      .send(comentario_create_Mock);
    const responseUpdate = await await supertest(app)
      .put(`/comentario/${body.id}`)
      .send({
        descricao:
          'Concordo muito! Lá está com um cheiro muito ruim e inseguro.',
        tipo: 'Negativo',
        cidadao_id: '69572845-2679-4e80-8971-4b647f47adb6',
        post_id: 'a02c59ed-79cf-4332-98bb-de04b3f4ed07',
      });
    expect(responseUpdate.status).toEqual(200);
    expect(responseUpdate.body).toEqual({
      id: body.id,
      descricao: 'Concordo muito! Lá está com um cheiro muito ruim e inseguro.',
      tipo: 'Negativo',
      cidadao_id: '69572845-2679-4e80-8971-4b647f47adb6',
      post_id: 'a02c59ed-79cf-4332-98bb-de04b3f4ed07',
      create_at: responseUpdate.body.create_at,
      updated_at: responseUpdate.body.updated_at,
    });

    await supertest(app).delete(`/comentario/${body.id}`);
  });

  it('should return error when an comment of the citizen does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/comentario/${idErrorMock}`
    );
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Comentário does not exists'
    });
  });

  it('should return error when the post connect an comment of the citizen does not exist', async () => {
    const { body, status } = await supertest(app).get(`/post/${idErrorMock}`);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Post does not exists',
    });
  });

  it('should return error when the citizen connect an comment does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/cidadao/${idErrorMock}`
    );
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Cidadão does not exists'
    });
  });
});

describe('Get comentário route test', () => {
  it('should return an comment of the citizen', async () => {
    const { body, status } = await supertest(app).get(`/comentario/${idMock}`);
    const expectedGet = await sutFactoryGet();
    expect(status).toEqual(200);
    expect(body).toEqual(expectedGet);
  });

  it('should return error when an comment does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/comentario/${idErrorMock}`
    );
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
      .send(comentario_create_Mock);
    expect(status).toEqual(201);
    expect(body).toEqual({
      id: body.id,
      descricao: 'Concordo muito! Lá está com um cheiro muito ruim e inseguro.',
      tipo: 'Positivo',
      cidadao_id: '69572845-2679-4e80-8971-4b647f47adb6',
      post_id: 'a02c59ed-79cf-4332-98bb-de04b3f4ed07',
      create_at: body.create_at,
      updated_at: body.updated_at,
    });

    await supertest(app).delete(`/comentario/${body.id}`);
  });

  it('should return error when the post connect an comment of the citizen does not exist', async () => {
    const { body, status } = await supertest(app).get(`/post/${idErrorMock}`);
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Post does not exists'
    });
  });

  it('should return error when the citizen connect an comment does not exist', async () => {
    const { body, status } = await supertest(app).get(
      `/cidadao/${idErrorMock}`
    );
    expect(status).toEqual(404);
    expect(body).toEqual({
      message: 'Cidadão does not exists'
    });
  });
});
