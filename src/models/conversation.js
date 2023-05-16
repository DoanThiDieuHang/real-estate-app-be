import mongoose from 'mongoose';
import { conversationError } from '../configs/conversationMessage.js';
const { Schema } = mongoose;

const conversationSchema = new Schema(
    {
        seller: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
            require: [true, 'Seller is required']
        },
        buyer: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
            require: [true, 'Buyer is required']
        },
        estate: {
            type: Schema.Types.ObjectId,
            ref: 'Estates',
            require: [true, 'Estate is required']
        }
    },
    {
        timestamps: true
    }
);

conversationSchema.statics.initiateConversation = async function (
    seller,
    buyer,
    estate
) {
    try {
        const availableConversation = await this.findOne({
            seller: seller,
            buyer: buyer,
            estate: estate
        });
        if (availableConversation) {
            return {
                isNew: false,
                message: conversationError.availableConversation,
                conversationId: availableConversation._doc._id
            };
        }
        const newConversation = await this.create({
            seller,
            buyer,
            estate
        });
        return {
            isNew: true,
            message: conversationError.createSuccess,
            conversationId: newConversation
        };
    } catch (err) {
        throw new Error(err.message);
    }
};

const ConversationModel = mongoose.model('Conversations', conversationSchema);
export default ConversationModel;
