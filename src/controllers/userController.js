import UserModel from '../models/user.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import factory from './handleFactory.js';
import status from 'http-status';
import { v2 as cloudinary } from 'cloudinary';
import lodash from 'lodash';
const messages = {
    routeForUpdatePassword:
        'This route is not for password updates. Please use /updateMyPassword.',
    success: 'success'
};

const getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};

const updateMe = catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(messages.routeForUpdatePassword, status.BAD_REQUEST)
        );
    }

    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const fieldsToUpdate = [
        'firstName',
        'lastName',
        'email',
        'address',
        'phoneNumber',
        'gender',
        'isPay',
        'maxPostEstate'
    ];
    const filteredBody = lodash.pick(req.body, fieldsToUpdate);
    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        filteredBody.profileImage = result.secure_url;
    }
    // 3) Update user document
    const updatedUser = await UserModel.findByIdAndUpdate(
        req.user.id,
        filteredBody,
        {
            new: true,
            runValidators: true
        }
    );
    res.status(status.OK).json({
        message: messages.success,
        data: {
            user: updatedUser
        }
    });
});

const getUser = factory.getOne(UserModel);
const getAllUsers = factory.getAll(UserModel);

// Do NOT update passwords with this!
const updateUser = factory.updateOne(UserModel);
const deleteUser = factory.deleteOne(UserModel);
const userController = {
    getMe,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
    updateMe
};
export default userController;
