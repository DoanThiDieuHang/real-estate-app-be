import AppError from '../utils/AppError.js';

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
};
const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);

    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const handleJWTError = () => {
    return new AppError('Invalid Token . PLease log in again!', 401);
};
const TokenExpiredError = () => {
    return new AppError('Token Expired . Please login again.', 401);
};
const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });

        // Programming or other unknown error: don't leak error details
    } else {
        // 1) Log error

        // 2) Send generic message
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!'
        });
    }
};
const nameError = {
    cast: 'castError',
    JWT: 'JsonWebTokenError',
    validator: 'validationError',
    tokenExpired: 'tokenExpiredError'
};

export default function globalErrorHandler(err, req, res, next) {
    // console.log(err.stack);

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        return sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };

        switch (error.name) {
            case nameError.cast:
                error = handleCastErrorDB(error);
                break;
            case nameError.JWT:
                error = handleJWTError(error);
                break;
            case nameError.validator:
                error = handleValidationErrorDB(error);
                break;
            case nameError.tokenExpired:
                error = TokenExpiredError(error);
                break;
            default:
                break;
        }
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        sendErrorProd(error, res);
    }
}
