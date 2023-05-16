import multer from 'multer';
import { UPLOAD_MESSAGE } from '../configs/index.js';
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|WEBP|webp)$/)) {
        req.fileValidationError = UPLOAD_MESSAGE.VALIDATION_TYPE;
        return cb(new Error(UPLOAD_MESSAGE.VALIDATION_FILE), false);
    }
    cb(null, true);
};

export const multifile = (req, res, next) => {
    const upload = multer({
        storage,
        fileFilter
    }).any();

    upload(req, res, err => {
        if (err) return next(new Error(err.message));
        next();
    });
};

export const uploader = {
    multifile
};
