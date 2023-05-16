import { checkExistanceEstate, checkIsOwner } from './estate.middleware.js';

const estateMiddleware = {
    checkExistanceEstate,
    checkIsOwner
};
export { estateMiddleware };
