import mongoose from 'mongoose';
const { Schema } = mongoose;

const conversationMessageSchema = new Schema(
    {
        conversation: {
            type: Schema.Types.ObjectId,
            ref: 'Conversations',
            require: [true, 'ConversationId is required']
        },
        postedByUser: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
            require: [true, 'PostedByUser is required']
        },
        messageContent: {
            type: mongoose.Schema.Types.Mixed
        },
        type: {
            type: String,
            default: 'text'
        },
        imageMessage: {
            type: String
        },
        isRecall: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const ConversationMessageModel = mongoose.model(
    'ConversationMessages',
    conversationMessageSchema
);
export default ConversationMessageModel;
