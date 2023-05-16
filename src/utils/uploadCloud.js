import { cloudinary } from '../configs/cloudinary.config.js';
import { file64 } from './UriConverter.js';

export const uploadCoverImageEstate = async (
  coverImageResized,
  folderName,
  cb
) => {
  if (coverImageResized) {
    if (cb) {
      await cb();
    }
    const coverImageUrl = (
      await cloudinary.uploader.upload(file64(coverImageResized).content, {
        folder: folderName,
      })
    )?.secure_url;
    return coverImageUrl;
  }
};

export const uploadThumbnailEstate = async (
  thumbnailResized,
  folderName,
  cb
) => {
  if (thumbnailResized) {
    if (cb) {
      await cb();
    }
    const thumbnailPromises = thumbnailResized.map((image) => {
      return cloudinary.uploader.upload(file64(image)?.content, {
        folder: folderName,
      });
    });
    const thumbnailPublicId = (await Promise.all(thumbnailPromises))?.map(
      (image) => image.secure_url
    );
    return thumbnailPublicId;
  }
};

export const getPublicIdByUrl = (url) => {
  return url
    .split('/')
    ?.slice(-3)
    ?.join('/')
    ?.replace(/\.(jpg|JPG|jpeg|JPEG|png|PNG|WEBP|webp)$/, () => '');
};
