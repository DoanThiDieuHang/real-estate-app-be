import mongoose from 'mongoose';

const estateTypeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Type of estate must have a name']
        }
    },
    {
        timestamps: true
    }
);
const EstateTypeModel = mongoose.model('EstateTypes', estateTypeSchema);
export default EstateTypeModel;
