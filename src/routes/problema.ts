import { Router } from 'express';

import { CreateProblemaController } from '../modules/problema/useCase/createProblema/CreateProblemaController';
import { DeleteProblemaController } from '../modules/problema/useCase/deleteProblema/DeleteProblemaController';
import { GetAllProblemaController } from '../modules/problema/useCase/getAllProblema/GetAllProblemaController';
import { GetProblemaController } from '../modules/problema/useCase/getProblema/GetProblemaController';
import { UpdateProblemaController } from '../modules/problema/useCase/updateProblema/UpdateProblemaController';

const createProblemaController = new CreateProblemaController();
const updateProblemaController = new UpdateProblemaController();
const getAllProblemaController = new GetAllProblemaController();
const deleteProblemaController = new DeleteProblemaController();
const getProblemaController = new GetProblemaController();

const problemaRoutes = Router();

problemaRoutes.post('/', createProblemaController.handle);
problemaRoutes.put('/:id', updateProblemaController.handle);
problemaRoutes.get('/', getAllProblemaController.handle);
problemaRoutes.get('/:id', getProblemaController.handle);
problemaRoutes.delete('/:id', deleteProblemaController.handle);

export { problemaRoutes };
