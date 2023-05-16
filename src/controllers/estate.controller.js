import { estateService } from '../services/index.js';
import status from 'http-status';
import factory from './handleFactory.js';
import EstateModel from '../models/estate.js';
import catchAsync from '../utils/catchAsync.js';
import APIFeatures from '../utils/APIFeatures.js';
import { ESTATE_MESSAGES } from '../configs/estates.config.js';

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
    const doc = await features.query;
    res.status(status.OK).json({
        message: status[status.OK],
        data: {
            records: doc,
            total: doc.length
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
export {
    createEstate,
    getInfoEstate,
    deleteEstate,
    getAllEstate,
    updateEstate,
    getEstateByOwner,
    findNearEstate
};
