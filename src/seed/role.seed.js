import { RoleModel } from '../models/index.js';
import seedingValue from './helper.seed.js';

async function seedRole(role) {
    try {
        await seedingValue(RoleModel, role);
    } catch (error) {
        throw new Error(error);
    }
}

export default seedRole;
