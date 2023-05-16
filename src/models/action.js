import mongoose from 'mongoose';

const actionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    }
});

const ActionModel = mongoose.model('Actions', actionSchema);
export default ActionModel;
