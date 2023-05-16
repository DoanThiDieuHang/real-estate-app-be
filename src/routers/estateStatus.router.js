import express from 'express';
import { estateStatusController } from '../controllers/index.js';

const estateStatusRouter = express.Router();

estateStatusRouter.get('/', estateStatusController.getAllEstateStatus);

export default estateStatusRouter;
