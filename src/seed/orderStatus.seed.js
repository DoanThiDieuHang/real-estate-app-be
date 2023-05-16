import { OrderStatusModel } from '../models/index.js';
import seedingValue from './helper.seed.js';

async function seedOrderStatus(status) {
    try {
        await seedingValue(OrderStatusModel, status);
    } catch (error) {
        throw new Error(error);
    }
}

export default seedOrderStatus;
