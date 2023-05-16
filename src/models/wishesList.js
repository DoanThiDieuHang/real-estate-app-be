import mongoose from 'mongoose';

const { Schema } = mongoose;

const wishesListSchema = new mongoose.Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
            required: [true, 'User is required']
        },
        estate: {
            type: Schema.Types.ObjectId,
            ref: 'Estates',
            required: [true, 'Estate liked is required']
        }
    },
    {
        timestamps: true
    }
);
wishesListSchema.pre(/^find/, function (next) {
    this.populate('estate');
    next();
});

const wishesListModel = mongoose.model('wishesListEstates', wishesListSchema);

export default wishesListModel;
