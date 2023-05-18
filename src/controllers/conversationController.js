import catchAsync from '../utils/catchAsync.js';
import status from 'http-status';
import ConversationModel from '../models/conversation.js';
import { conversationError } from '../configs/conversationMessage.js';
import { findContactEstate } from '../services/estate.services.js';
import conversationService from '../services/conversationService.js';
import AppError from './../utils/AppError.js';

const message = {
    404: 'No document found with that ID',
    200: 'Success',
    204: null
};

const createConversation = catchAsync(async (req, res, next) => {
    //setEstateUserIds();
    const { user, estate } = req.body;
    const contactEstate = await findContactEstate(estate);
    const seller = contactEstate.owner;

    const conversation = await ConversationModel.initiateConversation(
        seller,
        user,
        estate
    );
    return res.status(status.CREATED).json({
        message: conversationError.success,
        data: {
            record: conversation
        }
    });
});

const getConversationByUserId = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const conversation = await conversationService.findConversationsByUserId(
        userId
    );
    return res.status(status.OK).json({
        message: conversation.success,
        data: {
            records: conversation,
            total: conversation.length
        }
    });
});
const deleteConversation = catchAsync(async (req, res, next) => {
    const doc = await ConversationModel.findByIdAndDelete(
        req.params.conversationId
    );

    if (!doc) {
        return next(new AppError(message[404], status.NOT_FOUND));
    }

    res.status(status.NO_CONTENT).json({
        message: message[204],
        data: null
    });
});

const conversationController = {
    createConversation,
    getConversationByUserId,
    deleteConversation
};

export default conversationController;
