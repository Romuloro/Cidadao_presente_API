import { Router } from 'express';

import { CreateLocalidadeController } from '../modules/localidade/useCase/createLocalidade/CreateLocalidadeController';
import { DeleteLocalidadeController } from '../modules/localidade/useCase/deleteLocalidade/DeleteLocalidadeController';
import { GetAllLocalidadeController } from '../modules/localidade/useCase/getAllLocalidade/GetAllLocalidadesController';
import { GetLocalidadeController } from '../modules/localidade/useCase/getLocalidade/GetLocalidadeController';
import { UpdateLocalidadeController } from '../modules/localidade/useCase/updateLocalidade/UpdateLocalidadeController';
import { Auth } from '../utils/auth';

const createLocalidadeController = new CreateLocalidadeController();
const updateLocalidadeController = new UpdateLocalidadeController();
const getAllLocalidadeController = new GetAllLocalidadeController();
const deleteLocalidadeController = new DeleteLocalidadeController();
const getLocalidadeController = new GetLocalidadeController();
const auth = new Auth();

const localidadeRoutes = Router();

localidadeRoutes.post('/:nickName', auth.token, auth.role(["Admin", "Organizadores", "Cidadao"]), createLocalidadeController.handle);
localidadeRoutes.put('/:id/:nickName', auth.token, auth.role(["Admin", "Organizadores", "Cidadao"]), updateLocalidadeController.handle);
localidadeRoutes.get('/', auth.token, auth.role(["Admin", "Organizadores"]), getAllLocalidadeController.handle);
localidadeRoutes.get('/:id', auth.token, auth.role(["Admin", "Organizadores", "Cidadao"]), getLocalidadeController.handle);
localidadeRoutes.delete('/:id', auth.token, auth.role(["Admin"]), deleteLocalidadeController.handle);

export { localidadeRoutes };
