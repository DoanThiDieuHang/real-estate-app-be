export const handleError = (errMessage, res, status) =>
    res.status(status).json({
        message: errMessage
    });
