import { Router } from 'express';
import { AuthenticationController } from '../modules/cidadaos/useCase/authenticationCidadaos/AuthenticationController';

import { CreateCidadaoController } from '../modules/cidadaos/useCase/createCidadaos/CreateCidadaoController';
import { DeleteCidadaoController } from '../modules/cidadaos/useCase/deleteCidadaos/DeleteCidadaosController';
import { GetAllCidadaoController } from '../modules/cidadaos/useCase/getAllCidadaos/GetAllCidadosController';
import { GetCidadaoController } from '../modules/cidadaos/useCase/getCidadaos/GetCidadaosController';
import { UpdateCidadaoController } from '../modules/cidadaos/useCase/updateCidadaos/UpdateCidadaosController';
import { Auth } from '../utils/auth';

const createCidadaoController = new CreateCidadaoController();
const updateCidadaoController = new UpdateCidadaoController();
const getAllCidadaoController = new GetAllCidadaoController();
const deleteCidadaoController = new DeleteCidadaoController();
const getCidadaoController = new GetCidadaoController();

const authenticationController = new AuthenticationController()

const auth = new Auth()

const cidadaoRoutes = Router();

cidadaoRoutes.post('/login', authenticationController.handle)
cidadaoRoutes.post('/', auth.token, auth.role(["Admin", "Cidadao"]), createCidadaoController.handle);
cidadaoRoutes.put('/:id', auth.token, auth.role(["Admin"]), updateCidadaoController.handle);
cidadaoRoutes.get('/', auth.token, auth.role(["Admin", "Organizadores"]), getAllCidadaoController.handle);
cidadaoRoutes.get('/:id', auth.token, auth.role(["Admin","Cidadao", "Organizadores"]), getCidadaoController.handle);
cidadaoRoutes.delete('/:id', auth.role(["Admin"]), deleteCidadaoController.handle);

export { cidadaoRoutes };
