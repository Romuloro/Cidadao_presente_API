import { Router } from 'express';

import { cidadaoRoutes } from './cidadao';
import { comentarioRoutes } from './comentario';
import { localidadeRoutes } from './localidade';
import { postRoutes } from './post';
import { problemaRoutes } from './problema';

const routes = Router();

routes.use('/cidadao', cidadaoRoutes);

routes.use('/localidade', localidadeRoutes);

routes.use('/problema', problemaRoutes);

routes.use('/comentario', comentarioRoutes);

routes.use('/post', postRoutes);

export { routes };
