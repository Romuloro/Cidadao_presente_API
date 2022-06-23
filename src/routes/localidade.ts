import { Router } from 'express';

import { CreateLocalidadeController } from '../modules/localidade/useCase/createLocalidade/CreateLocalidadeController';
import { DeleteLocalidadeController } from '../modules/localidade/useCase/deleteLocalidade/DeleteLocalidadeController';
import { GetAllLocalidadeController } from '../modules/localidade/useCase/getAllLocalidade/GetAllLocalidadesController';
import { GetLocalidadeController } from '../modules/localidade/useCase/getLocalidade/GetLocalidadeController';
import { UpdateLocalidadeController } from '../modules/localidade/useCase/updateLocalidade/UpdateLocalidadeController';

const createLocalidadeController = new CreateLocalidadeController();
const updateLocalidadeController = new UpdateLocalidadeController();
const getAllLocalidadeController = new GetAllLocalidadeController();
const deleteLocalidadeController = new DeleteLocalidadeController();
const getLocalidadeController = new GetLocalidadeController();

const localidadeRoutes = Router();

localidadeRoutes.post('/', createLocalidadeController.handle);
localidadeRoutes.put('/:id', updateLocalidadeController.handle);
localidadeRoutes.get('/', getAllLocalidadeController.handle);
localidadeRoutes.get('/:id', getLocalidadeController.handle);
localidadeRoutes.delete('/:id', deleteLocalidadeController.handle);

export { localidadeRoutes };
