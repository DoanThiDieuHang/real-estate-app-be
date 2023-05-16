import { EstateStatusModel } from '../models/index.js';
import seedingValue from './helper.seed.js';

async function seedEstateStatus(status) {
    try {
        await seedingValue(EstateStatusModel, status);
    } catch (error) {
        throw new Error(error);
    }
}

export default seedEstateStatus;
