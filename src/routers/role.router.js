import express from 'express';
import { roleController } from '../controllers/index.js';

const roleRouter = express.Router();

roleRouter.get('/', roleController.getAllRoles);

export default roleRouter;
