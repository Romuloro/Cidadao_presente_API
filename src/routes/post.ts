import { Router } from 'express';

import { CreatePostController } from '../modules/post/useCase/createPost/CreatePostController';
import { DeletePostController } from '../modules/post/useCase/deletePost/DeletePostController';
import { GetAllPostController } from '../modules/post/useCase/getAllPost/GetAllPostController';
import { GetPostController } from '../modules/post/useCase/getPost/GetPostController';
import { UpdatePostController } from '../modules/post/useCase/updatePost/UpdatePostController';

const createPostController = new CreatePostController();
const updatePostController = new UpdatePostController();
const getAllPostController = new GetAllPostController();
const deletePostController = new DeletePostController();
const getPostController = new GetPostController();

const postRoutes = Router();

postRoutes.post('/', createPostController.handle);
postRoutes.put('/:id', updatePostController.handle);
postRoutes.get('/', getAllPostController.handle);
postRoutes.get('/:id', getPostController.handle);
postRoutes.delete('/:id', deletePostController.handle);

export { postRoutes };
