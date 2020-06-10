import { Router } from 'express';
import {
  login,
  loginValidator,
  register,
  registerValidator,
  activate,
} from '../controllers/auth.ctrl';

const AuthRouter = Router();
AuthRouter.post('/login', loginValidator, login);
AuthRouter.post('/register', registerValidator, register);
AuthRouter.get('/activate/:activationToken', activate);

export default AuthRouter;
