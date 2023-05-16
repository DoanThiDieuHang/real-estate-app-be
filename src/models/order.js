import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new mongoose.Schema(
    {
        buyer: {
            type: Schema.Types.ObjectId,
            ref: 'UserModel',
            required: [true, 'Buyer is required']
        },
        estate: {
            type: Schema.Types.ObjectId,
            ref: 'EstateModel',
            required: [true, 'Estate is required']
        },
        price_deal: {
            type: Number
        },
        status: {
            type: Schema.Types.ObjectId,
            required: [true, 'Status of order is required'],
            ref: 'OrderStatusModel'
        }
    },
    {
        timestamps: true
    }
);
const OrderModel = mongoose.model('Orders', orderSchema);
export default OrderModel;
