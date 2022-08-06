import { Router } from 'express';

import { CreateComentarioController } from '../modules/comentario/useCase/createComentario/CreateComentarioController';
import { DeleteComentarioController } from '../modules/comentario/useCase/deleteComentario/DeleteComentarioController';
import { GetAllComentarioController } from '../modules/comentario/useCase/getAllComentario/GetAllComentarioController';
import { GetComentarioController } from '../modules/comentario/useCase/getComentario/GetComentarioController';
import { UpdateComentarioController } from '../modules/comentario/useCase/updateComentario/UpdateComentarioController';
import { Auth } from '../utils/auth';

const createComentarioController = new CreateComentarioController();
const updateComentarioController = new UpdateComentarioController();
const getAllComentarioController = new GetAllComentarioController();
const deleteComentarioController = new DeleteComentarioController();
const getComentarioController = new GetComentarioController();
const auth = new Auth()

const comentarioRoutes = Router();

comentarioRoutes.post('/', auth.token, auth.role(["Admin", "Organizadores", "Cidadao"]), createComentarioController.handle);
comentarioRoutes.put('/:id', auth.token, auth.role(["Admin", "Organizadores", "Cidadao"]), updateComentarioController.handle);
comentarioRoutes.get('/', auth.token, auth.role(["Admin", "Organizadores"]), getAllComentarioController.handle);
comentarioRoutes.get('/:id', auth.token, auth.role(["Admin", "Organizadores"]), getComentarioController.handle);
comentarioRoutes.delete('/:id', auth.token, auth.role(["Admin", "Organizadores"]), deleteComentarioController.handle);

export { comentarioRoutes };
