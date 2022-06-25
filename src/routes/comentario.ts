import { Router } from 'express';

import { CreateComentarioController } from '../modules/comentario/useCase/createComentario/CreateComentarioController';
import { DeleteComentarioController } from '../modules/comentario/useCase/deleteComentario/DeleteComentarioController';
import { GetAllComentarioController } from '../modules/comentario/useCase/getAllComentario/GetAllComentarioController';
import { GetComentarioController } from '../modules/comentario/useCase/getComentario/GetComentarioController';
import { UpdateComentarioController } from '../modules/comentario/useCase/updateComentario/UpdateComentarioController';

const createComentarioController = new CreateComentarioController();
const updateComentarioController = new UpdateComentarioController();
const getAllComentarioController = new GetAllComentarioController();
const deleteComentarioController = new DeleteComentarioController();
const getComentarioController = new GetComentarioController();

const comentarioRoutes = Router();

comentarioRoutes.post('/', createComentarioController.handle);
comentarioRoutes.put('/:id', updateComentarioController.handle);
comentarioRoutes.get('/', getAllComentarioController.handle);
comentarioRoutes.get('/:id', getComentarioController.handle);
comentarioRoutes.delete('/:id', deleteComentarioController.handle);

export { comentarioRoutes };
