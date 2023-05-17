import catchAsync from '../utils/catchAsync.js';
import status from 'http-status';
import ConversationMessageModel from '../models/conversationMessage.js';
import { conversationError } from '../configs/conversationMessage.js';
import APIFeatures from '../utils/APIFeatures.js';
import AppError from '../utils/AppError.js';
import { v2 as cloudinary } from 'cloudinary';

const createConversationMessage = catchAsync(async (req, res, next) => {
    const data = {
        conversation: req.params.conversationId,
        postedByUser: req.user.id,
        ...req.body
    };
    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        data.imageMessage = result.secure_url;
    }

    const newMessage = await ConversationMessageModel.create(data);
    const resMessage = await ConversationMessageModel.findOne({
        _id: newMessage.id
    }).populate('postedByUser');

    global.io.to(data.conversation).emit('newMessage', { message: resMessage });

    return res.status(status.CREATED).json({
        message: conversationError.success,
        data: resMessage
    });
});
// get all message by ConversationId for user
const getAllMessagesByConversation = catchAsync(async (req, res, next) => {
    const { conversationId } = req.params;
    const messages = ConversationMessageModel.find({
        conversation: conversationId
    }).populate('postedByUser');
    const features = new APIFeatures(messages, req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const doc = await features.query;
    res.status(status.OK).json({
        messages: conversationError.OK,
        data: {
            records: doc,
            total: doc.length
        }
    });
});

const deleteConversationMessage = catchAsync(async (req, res, next) => {
    const { conversationMessageId, conversationId } = req.params;
    const conversationMessage =
        await ConversationMessageModel.findByIdAndUpdate(
            conversationMessageId,
            { isRecall: true },
            { new: true }
        );
    global.io
        .to(conversationId)
        .emit('messageDeleted', { messageId: conversationMessage });

    if (!conversationMessage) {
        return next(new AppError(conversationError[404], status.NOT_FOUND));
    }
    return res.status(status.OK).json({
        message: conversationError.reCall,
        data: {
            record: conversationMessage
        }
    });
});
const conversationMessageController = {
    createConversationMessage,
    getAllMessagesByConversation,
    deleteConversationMessage
};
export default conversationMessageController;
