import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentSchema = new mongoose.Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
            required: [true, 'Author is required']
        },
        estate: {
            type: Schema.Types.ObjectId,
            ref: 'Estates',
            required: [true, 'Estate is required']
        },
        content: {
            type: String
        },
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);
commentSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'author',
        select: 'lastName firstName profileImage'
    });
    next();
});
const CommentModel = mongoose.model('Comments', commentSchema);
export default CommentModel;
