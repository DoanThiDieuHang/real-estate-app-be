import express from 'express';
import userRouter from './userRoutes.js';
import orderStatusRouter from './orderStatus.router.js';
import roleRouter from './role.router.js';
import estateStatusRouter from './estateStatus.router.js';
import estateTypeRouter from './estateType.router.js';
import estateRouter from './estate.router.js';
import commentRouter from './commentRoutes.js';
import wishesListRouter from './wishesListRoutes.js';
import conversationRouter from './convensationRoutes.js';
import mapsRouter from './maps.router.js';
import order from './order.js';
const router = express.Router();

router.use('/order-status', orderStatusRouter);
router.use('/roles', roleRouter);

router.use('/users', userRouter);

router.use('/estate-status', estateStatusRouter);
router.use('/estate-types', estateTypeRouter);
router.use('/estates', estateRouter);
router.use('/comments', commentRouter);
router.use('/wishesLists', wishesListRouter);
router.use('/conversations', conversationRouter);
router.use('/maps', mapsRouter);
router.use('/order', order);
export default router;
