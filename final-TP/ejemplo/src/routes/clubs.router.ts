import { Router } from 'express';
import { ClubsController } from '../controllers';
import { auth, isAdmin, isOwner, isOwnerOrPlayer } from '../middlewares';

const ClubsRouter = Router();

ClubsRouter.get('/', auth, isAdmin, ClubsController.findAll);
ClubsRouter.post('/', auth, isAdmin, ClubsController.createOne);
ClubsRouter.delete('/', auth, isAdmin, ClubsController.deleteAll);

ClubsRouter.get('/:Id', auth, isOwnerOrPlayer, ClubsController.findOne);
ClubsRouter.put('/:Id', auth, isOwner, ClubsController.updateOne);
ClubsRouter.delete('/:Id', auth, isAdmin, ClubsController.deleteOne);

ClubsRouter.get('/:Id/teams', auth, isOwner, ClubsController.findTeams);
ClubsRouter.post('/:Id/teams', auth, isOwner, ClubsController.createTeam);

export default ClubsRouter;
