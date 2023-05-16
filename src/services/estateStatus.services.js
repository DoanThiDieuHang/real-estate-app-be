import { EstateStatusModel } from '../models/index.js';

export const getAllEstateStatus = async () => {
    const estateStatus = await EstateStatusModel.find();
    return estateStatus;
};
