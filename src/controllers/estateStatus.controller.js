import { estateStatusService } from '../services/index.js';
import { ESTATE_STATUS_RESPONSE_MESSAGE } from '../configs/index.js';
import status from 'http-status';
import { handleError } from '../utils/errHandler.js';

export const getAllEstateStatus = async (req, res) => {
    try {
        const estateStatus = await estateStatusService.getAllEstateStatus();
        return res.status(status.OK).json({
            message:
                ESTATE_STATUS_RESPONSE_MESSAGE.MESSAGE_SUCCESS_GETALL_ESTATE_STATUS,
            data: {
                records: estateStatus,
                total: estateStatus.length
            }
        });
    } catch (error) {
        return handleError(error.message, res, status.INTERNAL_SERVER_ERROR);
    }
};
