import express from 'express';
import { estateTypeController } from '../controllers/index.js';

const estateTypeRouter = express.Router();

estateTypeRouter.get('/', estateTypeController.getAllEstateType);

export default estateTypeRouter;
