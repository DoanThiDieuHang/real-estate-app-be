import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import status from 'http-status';
import { message } from '../configs/commentMessageRes.js';
import ConversationModel from '../models/conversation.js';
import { conversationError } from '../configs/conversationMessage.js';
import ConversationMessageModel from '../models/conversationMessage.js';

export const setEstateUserIds = catchAsync(async (req, res, next) => {
    if (!req.body?.estate) req.body.estate = req.params.estateId;
    if (!req.body?.user) req.body.user = req.user.id;
    next();
});

export const checkIfUserIsOwner = Model =>
    catchAsync(async (req, res, next) => {
        const checkModel = await Model.findById(req.params.id);
        if (!(checkModel.user.toString() === req.user.id)) {
            return next(
                new AppError(message.errorUserNotOwner, status.UNAUTHORIZED)
            );
        }
        next();
    });
export const checkIfUserIsOwnerMessage = catchAsync(async (req, res, next) => {
    const conversationMessage = await ConversationMessageModel.findById(
        req.params.conversationMessageId
    );
    if (!(conversationMessage.postedByUser.toString() === req.user.id)) {
        return next(
            new AppError(
                conversationError.errorUserNotOwner,
                status.UNAUTHORIZED
            )
        );
    }
    next();
});
export const checkUserAdmin = catchAsync(async (req, res, next) => {
    if (req.user?.role.toString().toLowerCase() !== 'admin') {
        return next(
            new AppError('User is not an administrator', status.UNAUTHORIZED)
        );
    }
    next();
});

export const checkUserIsInConversation = catchAsync(async (req, res, next) => {
    const currentConversation = await ConversationModel.findById(
        req.params.conversationId
    );
    if (
        !(
            currentConversation.seller.toString() === req.user.id ||
            currentConversation.buyer.toString() === req.user.id
        )
    ) {
        return next(
            new AppError(
                conversationError.notInConversation,
                status.UNAUTHORIZED
            )
        );
    }
    next();
});
