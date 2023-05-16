import express from 'express';
import wishesListController from '../controllers/wishesListController.js';
import authController from '../controllers/authController.js';
import wishesListModel from '../models/wishesList.js';
import {
    setEstateUserIds,
    checkIfUserIsOwner
} from '../middlewares/userModelMiddlewares.js';
const wishesListRouter = express.Router({ mergeParams: true });
wishesListRouter.use(authController.protect);

wishesListRouter
    .route('/')
    .get(wishesListController.getAllWishesList)
    .post(setEstateUserIds, wishesListController.createWishesList);
wishesListRouter
    .route('/:id')
    .get(wishesListController.getWishesList)
    .delete(
        checkIfUserIsOwner(wishesListModel),
        wishesListController.deleteWishesList
    )
    .patch(
        checkIfUserIsOwner(wishesListModel),
        wishesListController.updateWishesList
    );
export default wishesListRouter;
