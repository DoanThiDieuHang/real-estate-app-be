import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinaryConfig } from './constants.js';
cloudinary.config({
    cloud_name: cloudinaryConfig.cloud_name,
    api_key: cloudinaryConfig.api_key,
    api_secret: cloudinaryConfig.api_secret
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Image-profile',
        allowedFormats: ['jpg', 'jpeg', 'png'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }
});
const upload = multer({ storage: storage });

export { upload, cloudinary };
