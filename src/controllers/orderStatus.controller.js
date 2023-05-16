import { orderStatusService } from '../services/index.js';
import { ORDER_STATUS_RESPONSE_MESSAGE } from '../configs/index.js';
import status from 'http-status';
import { handleError } from '../utils/errHandler.js';

export const getAllOrderStatus = async (req, res) => {
    try {
        const orderStatus = await orderStatusService.getAllOrderStatus();
        return res.status(status.OK).json({
            message:
                ORDER_STATUS_RESPONSE_MESSAGE.MESSAGE_SUCCESS_GETALL_ORDER_STATUS,
            data: {
                records: orderStatus,
                total: orderStatus.length
            }
        });
    } catch (error) {
        return handleError(error.message, res, status.INTERNAL_SERVER_ERROR);
    }
};
