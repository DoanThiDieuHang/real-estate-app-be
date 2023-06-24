import {
    checkExistanceEstate,
    checkIsOwnerOrAdmin
} from './estate.middleware.js';

const estateMiddleware = {
    checkExistanceEstate,
    checkIsOwnerOrAdmin
};
export { estateMiddleware };
