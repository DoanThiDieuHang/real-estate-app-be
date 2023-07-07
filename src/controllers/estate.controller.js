import { estateService } from '../services/index.js';
import status from 'http-status';
import factory from './handleFactory.js';
import EstateModel from '../models/estate.js';
import catchAsync from '../utils/catchAsync.js';
import APIFeatures from '../utils/APIFeatures.js';
import { ESTATE_MESSAGES } from '../configs/estates.config.js';
import conversationService from '../services/conversationService.js';
import { estateRecommend } from '../services/index.js';
import wishesListModel from '../models/wishesList.js';

const createEstate = async (req, res, next) => {
    try {
        const estateAdded = await estateService.createEstate({
            salerId: req.user.id,
            body: req.body,
            files: req.files
        });
        return res.status(status.OK).json({
            message: status[status.CREATED],
            data: { records: estateAdded }
        });
    } catch (error) {
        return next(error);
    }
};

const getAllEstate = factory.getAll(EstateModel);
const getAllEstateNoPaging = async (req, res, next) => {
    try {
        const estate = await EstateModel.find();
        return res.status(status.OK).json({
            message: status[status.OK],
            data: {
                records: estate,
                total: estate.length,
                totalDocs: estate.length
            }
        });
    } catch (error) {
        return next(error);
    }
};

const getInfoEstate = async (req, res, next) => {
    try {
        const estateId = req.params.id;
        const estate = await estateService.getInfoEstate(estateId);
        return res.status(status.OK).json({
            message: status[status.OK],
            data: {
                records: estate
            }
        });
    } catch (error) {
        return next(error);
    }
};

const getEstateByOwner = catchAsync(async (req, res, next) => {
    const owner = req.user.id;

    const features = new APIFeatures(
        EstateModel.find({ owner: owner }),
        req.query
    )
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const [doc, countDocuments] = await Promise.all([
        features.query,
        features.count()
    ]);
    res.status(status.OK).json({
        message: status[status.OK],
        data: {
            records: doc,
            total: doc.length,
            totalDocs: countDocuments
        }
    });
});
const getEstateByUser = catchAsync(async (req, res, next) => {
    const owner = req.params.id;

    const features = new APIFeatures(
        EstateModel.find({ owner: owner }),
        req.query
    )
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const [doc, countDocuments] = await Promise.all([
        features.query,
        features.count()
    ]);
    res.status(status.OK).json({
        message: status[status.OK],
        data: {
            records: doc,
            total: doc.length,
            totalDocs: countDocuments
        }
    });
});

const updateEstate = async (req, res, next) => {
    try {
        const estateUpdated = await estateService.updateEstate({
            estate: req.estate,
            body: req.body,
            files: req.files
        });
        return res.status(status.OK).json({
            message: ESTATE_MESSAGES.UPDATED,
            data: { records: estateUpdated }
        });
    } catch (error) {
        return next(error);
    }
};
const updateStatusEstate = factory.updateOne(EstateModel);
const deleteEstate = async (req, res, next) => {
    try {
        const estateDeleted = await estateService.deleteEstate(req.estate);
        return res.status(status.OK).json({
            message: ESTATE_MESSAGES.DELETED,
            data: { records: estateDeleted }
        });
    } catch (error) {
        return next(error);
    }
};

const findNearEstate = catchAsync(async (req, res, next) => {
    const { longitude, latitude, radius } = req.body;
    const coordinates = [longitude, latitude]; // San Francisco longitude and latitude
    const features = new APIFeatures(
        EstateModel.findNearest(coordinates, radius),
        req.query
    ).paginate();
    const doc = await features.query;
    return res.status(status.OK).json({
        message: status[status.OK],
        data: {
            records: doc,
            total: doc.length
        }
    });
});
const getMyEstateRecommended = catchAsync(async (req, res, next) => {
    const owner = req.user.id;

    const [listLikedEstate, listMyConversation] = await Promise.all([
        wishesListModel.find({ user: owner }),
        conversationService.findConversationsByUserId(owner)
    ]);

    const likedEstate = listLikedEstate?.map(item => item.estate) || [];
    const myConversation = listMyConversation?.map(item => item.estate) || [];

    const estateForRecommend =
        listLikedEstate.length === 0
            ? myConversation
            : listMyConversation.length === 0
            ? likedEstate
            : [...likedEstate, ...myConversation];

    const [estateRecommendedData, lengthOfEstateRecommend] =
        await estateRecommend.hybrid_estatesRecommendation({
            itemNames: estateForRecommend,
            userId: owner
        });

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const doc = estateRecommendedData.slice(startIndex, endIndex);
    res.status(status.OK).json({
        message: status[status.OK],
        data: {
            records: doc,
            total: doc.length,
            totalDocs: lengthOfEstateRecommend
        }
    });
});
export {
    createEstate,
    getInfoEstate,
    deleteEstate,
    getAllEstate,
    updateEstate,
    getEstateByOwner,
    findNearEstate,
    updateStatusEstate,
    getMyEstateRecommended,
    getAllEstateNoPaging,
    getEstateByUser
};
