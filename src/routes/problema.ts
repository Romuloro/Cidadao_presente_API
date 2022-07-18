import { Router } from 'express';

import { CreateProblemaController } from '../modules/problema/useCase/createProblema/CreateProblemaController';
import { DeleteProblemaController } from '../modules/problema/useCase/deleteProblema/DeleteProblemaController';
import { GetAllProblemaController } from '../modules/problema/useCase/getAllProblema/GetAllProblemaController';
import { GetProblemaController } from '../modules/problema/useCase/getProblema/GetProblemaController';
import { UpdateProblemaController } from '../modules/problema/useCase/updateProblema/UpdateProblemaController';
import { Auth } from '../utils/auth';

const createProblemaController = new CreateProblemaController();
const updateProblemaController = new UpdateProblemaController();
const getAllProblemaController = new GetAllProblemaController();
const deleteProblemaController = new DeleteProblemaController();
const getProblemaController = new GetProblemaController();
const auth = new Auth()


const problemaRoutes = Router();

problemaRoutes.post('/', auth.token, auth.role(["Admin", "Organizadores"]), createProblemaController.handle);
problemaRoutes.put('/:id', auth.token, auth.role(["Admin", "Organizadores"]), updateProblemaController.handle);
problemaRoutes.get('/', auth.token, auth.role(["Admin", "Organizadores", "Cidadao"]), getAllProblemaController.handle);
problemaRoutes.get('/:id', auth.token, auth.role(["Admin", "Organizadores"]), getProblemaController.handle);
problemaRoutes.delete('/:id', auth.token, auth.role(["Admin"]), deleteProblemaController.handle);

export { problemaRoutes };
