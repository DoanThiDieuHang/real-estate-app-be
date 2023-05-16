import { EstateTypeModel } from '../models/index.js';
import seedingValue from './helper.seed.js';

async function seedEstateType(type) {
    try {
        await seedingValue(EstateTypeModel, type);
    } catch (error) {
        throw new Error(error);
    }
}

export default seedEstateType;
