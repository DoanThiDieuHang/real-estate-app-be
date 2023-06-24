import express from 'express';
import authController from '../controllers/authController.js';
import { estateController } from '../controllers/index.js';
import commentRouter from './commentRoutes.js';
import { uploader } from '../utils/multer.js';
import wishesListRouter from './wishesListRoutes.js';
import commentController from '../controllers/commentController.js';
import { estateMiddleware } from '../middlewares/index.js';
import conversationController from '../controllers/conversationController.js';
import { setEstateUserIds } from '../middlewares/userModelMiddlewares.js';

const estateRouter = express.Router();
estateRouter.post('/nearestEstate', estateController.findNearEstate);
estateRouter.get('/', estateController.getAllEstate);
estateRouter.route('/:estateId/comments', commentController.getCommentByEstate);
estateRouter.get(
    '/:id',
    estateMiddleware.checkExistanceEstate,
    estateController.getInfoEstate
);
estateRouter.get('/:estateId/comments', commentController.getCommentByEstate);
estateRouter.use(authController.protect);
estateRouter.use('/:estateId/wishesLists', wishesListRouter);
estateRouter.post('/', uploader.multifile, estateController.createEstate);
estateRouter.use('/:estateId/comments', commentRouter);
estateRouter.delete(
    '/:id',
    estateMiddleware.checkExistanceEstate,
    estateMiddleware.checkIsOwnerOrAdmin,
    estateController.deleteEstate
);
estateRouter.post(
    '/:estateId/conversations',
    setEstateUserIds,
    conversationController.createConversation
);
estateRouter.patch(
    '/:id',
    estateMiddleware.checkExistanceEstate,
    estateMiddleware.checkIsOwnerOrAdmin,
    uploader.multifile,
    estateController.updateEstate
);
estateRouter.patch('/:id/updateStatus', estateController.updateStatusEstate);

export default estateRouter;
