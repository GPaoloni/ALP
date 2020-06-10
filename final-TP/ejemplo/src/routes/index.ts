import { Router } from 'express';
import * as swaggerUI from 'swagger-ui-express';
import * as swaggerDocument from '../../swagger.json';
import UserRouter from './user.router';
import AuthRouter from './auth.router';
import ClubsRouter from './clubs.router';

const SwaggerAPIRouter = Router();

const router = Router();
/**
 * Add swagger endpoints
 */
router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
router.use('/api/v1', SwaggerAPIRouter);
/**
 * Add api endpoints
 */
router.use('/auth', AuthRouter);
router.use('/users', UserRouter);
router.use('/clubs', ClubsRouter);

export default router;
