import express from 'express';
import { orderStatusController } from '../controllers/index.js';

const orderStatusRouter = express.Router();

orderStatusRouter.get('/', orderStatusController.getAllOrderStatus);

export default orderStatusRouter;
