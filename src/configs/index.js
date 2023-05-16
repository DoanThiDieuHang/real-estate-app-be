import { MESSAGE_SUCCESS_GETALL_ROLE } from './role.messageResponse.js';
import { MESSAGE_SUCCESS_GETALL_ORDER_STATUS } from './orderStatus.messageResponse.js';
import { MESSAGE_SUCCESS_GETALL_ESTATE_STATUS } from './estateStatus.messageResponse.js';
import { UPLOAD_MESSAGE } from './upload.messageResponse.js';
import { dtoEstate } from './whiteListObject.js';

const ROLE_RESPONSE_MESSAGE = {
    MESSAGE_SUCCESS_GETALL_ROLE
};

const ORDER_STATUS_RESPONSE_MESSAGE = {
    MESSAGE_SUCCESS_GETALL_ORDER_STATUS
};
const ESTATE_STATUS_RESPONSE_MESSAGE = {
    MESSAGE_SUCCESS_GETALL_ESTATE_STATUS
};

const DTO = {
    dtoEstate
};
export {
    UPLOAD_MESSAGE,
    ROLE_RESPONSE_MESSAGE,
    ORDER_STATUS_RESPONSE_MESSAGE,
    ESTATE_STATUS_RESPONSE_MESSAGE,
    DTO
};
