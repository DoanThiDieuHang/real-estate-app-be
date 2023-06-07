import { getAllRoles } from './role.services.js';
import { getAllOrderStatus } from './orderStatus.services.js';
import { getAllEstateStatus } from './estateStatus.services.js';
import {
    createEstate,
    getInfoEstate,
    deleteEstate,
    updateEstate
} from './estate.services.js';
import { hybrid_estatesRecommendation } from './estate_recommend.services.js';

const roleService = {
    getAllRoles
};

const orderStatusService = {
    getAllOrderStatus
};

const estateStatusService = {
    getAllEstateStatus
};

const estateService = {
    createEstate,
    getInfoEstate,
    deleteEstate,
    updateEstate
};

const estateRecommend = {
    hybrid_estatesRecommendation
};

export {
    roleService,
    orderStatusService,
    estateStatusService,
    estateService,
    estateRecommend
};
