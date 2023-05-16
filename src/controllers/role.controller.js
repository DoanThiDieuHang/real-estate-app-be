import { roleService } from '../services/index.js';
import { ROLE_RESPONSE_MESSAGE } from '../configs/index.js';
import status from 'http-status';
import { handleError } from '../utils/errHandler.js';

export const getAllRoles = async (req, res) => {
    try {
        const roles = await roleService.getAllRoles();
        return res.status(status.OK).json({
            message: ROLE_RESPONSE_MESSAGE.MESSAGE_SUCCESS_GETALL_ROLE,
            data: {
                records: roles,
                total: roles.length
            }
        });
    } catch (error) {
        return handleError(error.message, res, status.INTERNAL_SERVER_ERROR);
    }
};
