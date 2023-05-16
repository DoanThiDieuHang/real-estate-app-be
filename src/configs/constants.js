import * as dotenv from 'dotenv';
dotenv.config();

const cloud_name = process.env.CLOUDINARY_NAME;
const api_key = process.env.CLOUDINARY_KEY;
const api_secret = process.env.CLOUDINARY_SECRET;
export const cloudinaryConfig = { cloud_name, api_key, api_secret };
export const { NODE_ENV } = process.env;
export const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.MONGODB_CONNECTION_LOCALHOST_URL;
const { DATABASE } = process.env;
const DATABASE_NAME = process.env.DB_NAME;
export const databaseConfig = {
    DATABASE_NAME,
    DATABASE_URL,
    DATABASE
};

const apiKey = process.env.HERE_GEOCODING_API_KEY;
const appId = process.env.HERE_GEOCODING_APP_ID;

export const mapConfig = {
    apiKey,
    appId
};
