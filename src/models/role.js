import mongoose from 'mongoose';
const { Schema } = mongoose;

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name of rule must be required']
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'UserModel'
        }
    ],
    actions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'ActionModel'
        }
    ]
});

const RoleModel = mongoose.model('Roles', RoleSchema);

export default RoleModel;
