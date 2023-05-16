import wishesListModel from '../models/wishesList.js';
import catchAsync from '../utils/catchAsync.js';
import factory from './handleFactory.js';
import status from 'http-status';
import APIFeatures from '../utils/APIFeatures.js';

const getAllWishesList = factory.getAll(wishesListModel);
const getWishesList = factory.getOne(wishesListModel);
const createWishesList = factory.createOne(wishesListModel);
const updateWishesList = factory.updateOne(wishesListModel);
const deleteWishesList = factory.deleteOne(wishesListModel);

const getWishesListByUser = catchAsync(async (req, res, next) => {
    const user = req.user.id;

    const features = new APIFeatures(
        wishesListModel.find({ user: user }),
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
const wishesListController = {
    getAllWishesList,
    getWishesList,
    createWishesList,
    updateWishesList,
    deleteWishesList,
    getWishesListByUser
};
export default wishesListController;
