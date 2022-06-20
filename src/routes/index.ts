import { Router } from 'express';
import { cidadaoRoutes } from './cidadao';

const routes = Router();

routes.use('/cidadao', cidadaoRoutes);

export { routes };
