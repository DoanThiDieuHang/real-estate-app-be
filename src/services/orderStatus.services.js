import { OrderStatusModel } from '../models/index.js';

export const getAllOrderStatus = async () => {
    const orderStatus = await OrderStatusModel.find();
    return orderStatus;
};
