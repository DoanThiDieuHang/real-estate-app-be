import factory from './handleFactory.js';
import EstateTypeModel from '../models/estateType.js';

export const getAllEstateType = factory.getAll(EstateTypeModel);
