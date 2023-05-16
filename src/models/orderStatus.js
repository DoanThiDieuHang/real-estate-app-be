import mongoose from 'mongoose';

const orderStatusChema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Status of order must have a name']
        }
    },
    {
        timestamps: true
    }
);
const OrderStatusModel = mongoose.model('OrderStatus', orderStatusChema);
export default OrderStatusModel;
