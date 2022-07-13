import { Router } from 'express';
import { AuthenticationController } from '../modules/cidadaos/useCase/authenticationCidadaos/AuthenticationController';

import { CreateCidadaoController } from '../modules/cidadaos/useCase/createCidadaos/CreateCidadaoController';
import { DeleteCidadaoController } from '../modules/cidadaos/useCase/deleteCidadaos/DeleteCidadaosController';
import { GetAllCidadaoController } from '../modules/cidadaos/useCase/getAllCidadaos/GetAllCidadosController';
import { GetCidadaoController } from '../modules/cidadaos/useCase/getCidadaos/GetCidadaosController';
import { UpdateCidadaoController } from '../modules/cidadaos/useCase/updateCidadaos/UpdateCidadaosController';
import { AuthToken } from '../utils/auth';

const createCidadaoController = new CreateCidadaoController();
const updateCidadaoController = new UpdateCidadaoController();
const getAllCidadaoController = new GetAllCidadaoController();
const deleteCidadaoController = new DeleteCidadaoController();
const getCidadaoController = new GetCidadaoController();

const authenticationController = new AuthenticationController()

const authToken = new AuthToken()

const cidadaoRoutes = Router();

cidadaoRoutes.post('/login', authenticationController.handle)
cidadaoRoutes.post('/', authToken.execute, createCidadaoController.handle);
cidadaoRoutes.put('/:id', authToken.execute, updateCidadaoController.handle);
cidadaoRoutes.get('/', authToken.execute, getAllCidadaoController.handle);
cidadaoRoutes.get('/:id', authToken.execute, getCidadaoController.handle);
cidadaoRoutes.delete('/:id', authToken.execute, deleteCidadaoController.handle);

export { cidadaoRoutes };
