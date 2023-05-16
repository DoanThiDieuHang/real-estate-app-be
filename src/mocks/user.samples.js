import { UserModel } from '../models/index.js';
import seedingValue from '../seed/helper.seed.js';

async function createSampleUsers(users) {
    try {
        await seedingValue(UserModel, users);
    } catch (error) {
        throw new Error(error);
    }
}

export default createSampleUsers;
