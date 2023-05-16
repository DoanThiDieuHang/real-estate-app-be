import UserModel from '../models/user.js';
import catchAsync from '../utils/catchAsync.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';
import { promisify } from 'util';
import sendEmail from '../utils/sendEmail.js';
import status from 'http-status';
import message from '../configs/authMessageRes.js';
const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user, statusCode, res) => {
    // send token via cookie
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 20 * 60 * 60 * 1000 //90days
        ),
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);
    user.password = undefined;
    res.status(statusCode).json({
        message: message.statusSuccess,
        data: {
            user,
            token
        }
    });
};

const signup = catchAsync(async (req, res, next) => {
    const checkEmail = await UserModel.findOne({ email: req.body.email });
    if (checkEmail) {
        return next(
            new AppError(message.emailAlreadyExists, status.BAD_REQUEST)
        );
    }
    const newUser = await UserModel.create(req.body);
    createSendToken(newUser, status.CREATED, res);
});

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
        return next(new AppError(message.provideLogin, status.BAD_REQUEST));
    }
    //2 check if email and password correct
    const user = await UserModel.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError(message.incorrectLogin, status.UNAUTHORIZED));
    }
    //3 if everything ok, send token to client
    createSendToken(user, status.OK, res);
});

const protect = catchAsync(async (req, res, next) => {
    /*  
  #swagger.tags = ['Users];
  #swagger.consumes = ['application/json'];
  
  #swagger.security = [{
               "jwt": []
        }] 
  */

    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new AppError(message.isLogin, status.UNAUTHORIZED));
    }
    //2 ) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //3 check if user still exits
    const currentUser = await UserModel.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError(message.userStillExists, status.UNAUTHORIZED));
    }

    //4 ) check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError(message.userChangedPassword, status.UNAUTHORIZED)
        );
    }
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
});
const restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles ['admin']
        if (!roles.includes(req.user.role)) {
            return next(new AppError(message.permisson, status.FORBIDDEN));
        }
        next();
    };
};
const forgotPassword = catchAsync(async (req, res, next) => {
    //1) Get user based on posted email
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError(message.userWithEmail, status.NOT_FOUND));
    }
    //2) generate te random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    // send it to user email
    const resetUrl = `${req.protocol}://${req.get(
        'host'
    )}/api/v1/users/resetPassword/${resetToken}`;
    const message = `Forgot your password? Click on the following link to reset your password: ${resetUrl}`;
    try {
        await sendEmail({
            email: user.email,
            subject: message.resetToken,
            message
        });
        res.status(status.OK).json({
            status: message.statusSuccess,
            message: message.sendEmailSuccess
        });
    } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        return next(
            new AppError(message.sendEmailError, status.INTERNAL_SERVER_ERROR)
        );
    }
});
const resetPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on the token
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');
    const user = await UserModel.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });
    // 2) if token has not expired , and there is user , set the new password

    if (!user) {
        return next(new AppError(message.tokenExpired, status.BAD_REQUEST));
    }
    // 3) update changedPasswordAt property for the user

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({
        validateBeforeSave: true
    });
    // 4) Log the user in, send JWT
    createSendToken(user, status.OK, res);
});

const updatePassword = catchAsync(async (req, res, next) => {
    // 1) Get user from collection
    const user = await UserModel.findById(req.user.id).select('+password');

    // 2) Check if POSTed current password is correct
    if (
        !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
        return next(
            new AppError(message.passwordCurrentWrong, status.UNAUTHORIZED)
        );
    }

    // 3) If so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    // User.findByIdAndUpdate will NOT work as intended!

    // 4) Log user in, send JWT
    createSendToken(user, status.OK, res);
});
const authController = {
    signup,
    login,
    protect,
    restrictTo,
    forgotPassword,
    resetPassword,
    updatePassword
};
export default authController;
