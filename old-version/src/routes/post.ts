import { Router } from 'express';

import { CreatePostController } from '../modules/post/useCase/createPost/CreatePostController';
import { DeletePostController } from '../modules/post/useCase/deletePost/DeletePostController';
import { GetAllPostController } from '../modules/post/useCase/getAllPost/GetAllPostController';
import { GetPostController } from '../modules/post/useCase/getPost/GetPostController';
import { UpdatePostController } from '../modules/post/useCase/updatePost/UpdatePostController';
import { Auth } from '../utils/auth';

const createPostController = new CreatePostController();
const updatePostController = new UpdatePostController();
const getAllPostController = new GetAllPostController();
const deletePostController = new DeletePostController();
const getPostController = new GetPostController();
const auth = new Auth()

const postRoutes = Router();

postRoutes.post('/', auth.token, auth.role(["Admin", "Organizadores", "Cidadao"]), createPostController.handle);
postRoutes.put('/:id', auth.token, auth.role(["Admin", "Organizadores", "Cidadao"]), updatePostController.handle);
postRoutes.get('/', auth.token, auth.role(["Admin", "Organizadores"]), getAllPostController.handle);
postRoutes.get('/:id', auth.token, auth.role(["Admin", "Organizadores", "Cidadao"]), getPostController.handle);
postRoutes.delete('/:id', auth.token, auth.role(["Admin", "Organizadores"]), deletePostController.handle);

export { postRoutes };
