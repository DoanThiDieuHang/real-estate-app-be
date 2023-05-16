import mongoose from 'mongoose';

const estateStatusChema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Status of estate must have name']
        }
    },
    {
        timestamps: true
    }
);
const EstateStatusModel = mongoose.model('EstateStatuses', estateStatusChema);
export default EstateStatusModel;
