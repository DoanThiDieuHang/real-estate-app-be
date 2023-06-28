import { getAllRoles } from './role.controller.js';
import { getAllOrderStatus } from './orderStatus.controller.js';
import { getAllEstateStatus } from './estateStatus.controller.js';
import { getAllEstateType } from './estateType.controller.js';
import {
    createEstate,
    getAllEstate,
    getInfoEstate,
    deleteEstate,
    updateEstate,
    getEstateByOwner,
    findNearEstate,
    updateStatusEstate,
    getMyEstateRecommended,
    getAllEstateNoPaging
} from './estate.controller.js';

const roleController = {
    getAllRoles
};

const orderStatusController = {
    getAllOrderStatus
};

const estateStatusController = {
    getAllEstateStatus
};

const estateTypeController = {
    getAllEstateType
};
const estateController = {
    createEstate,
    getAllEstate,
    getInfoEstate,
    deleteEstate,
    updateEstate,
    getEstateByOwner,
    findNearEstate,
    updateStatusEstate,
    getMyEstateRecommended,
    getAllEstateNoPaging
};

export {
    roleController,
    orderStatusController,
    estateStatusController,
    estateTypeController,
    estateController
};
