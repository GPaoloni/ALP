import { Router } from 'express';
import { getAll } from '../controllers/user.ctrl';

const UserRouter = Router();
// TODO: IMPLEMENT this should be protected with an "isAdmin" middleware
UserRouter.get('/', getAll);

export default UserRouter;
