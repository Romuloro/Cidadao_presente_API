import { Router } from 'express';

import { CreateCidadaoController } from '../modules/cidadaos/useCase/createCidadaos/CreateCidadaoController';
import { DeleteCidadaoController } from '../modules/cidadaos/useCase/deleteCidadaos/DeleteCidadaosController';
import { GetAllCidadaoController } from '../modules/cidadaos/useCase/getAllCidadaos/GetAllCidadosController';
import { GetCidadaoController } from '../modules/cidadaos/useCase/getCidadaos/GetCidadaosController';
import { UpdateCidadaoController } from '../modules/cidadaos/useCase/updateCidadaos/UpdateCidadaosController';

const createCidadaoController = new CreateCidadaoController();
const updateCidadaoController = new UpdateCidadaoController();
const getAllCidadaoController = new GetAllCidadaoController();
const deleteCidadaoController = new DeleteCidadaoController();
const getCidadaoController = new GetCidadaoController();

const cidadaoRoutes = Router();

cidadaoRoutes.post('/', createCidadaoController.handle);
cidadaoRoutes.put('/:id', updateCidadaoController.handle);
cidadaoRoutes.get('/', getAllCidadaoController.handle);
cidadaoRoutes.get('/:id', getCidadaoController.handle);
cidadaoRoutes.delete('/:id', deleteCidadaoController.handle);

export { cidadaoRoutes };
