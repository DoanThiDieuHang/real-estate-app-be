import { EstateModel } from '../models/index.js';
import status from 'http-status';
import { ESTATE_MESSAGES } from '../configs/estates.config.js';
import AppError from '../utils/AppError.js';

export const checkExistanceEstate = async (req, res, next) => {
  try {
    const estateId = req.params.id;
    const estateFound = await EstateModel.findById(estateId);
    if (!estateFound)
      return next(
        new AppError(ESTATE_MESSAGES.NOT_FOUND_WITH_ID, status.NOT_FOUND)
      );
    req.estate = estateFound; // stored estate in request
  } catch (error) {
    return next(error);
  }
  next();
};

export const checkIsOwner = async (req, res, next) => {
  try {
    const salerId = req.user.id;
    const estateFound = req.estate;
    if (salerId !== estateFound.owner?.id.toString()) {
      return next(new AppError(ESTATE_MESSAGES.IS_NOT_OWNER, status.FORBIDDEN));
    }
  } catch (error) {
    return next(error);
  }
  next();
};
