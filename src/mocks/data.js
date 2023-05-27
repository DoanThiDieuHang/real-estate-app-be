import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

export const users = [
    {
        id: mongoose.Types.ObjectId(),
        firstName: 'tran',
        lastName: 'duy',
        email: 'duy2@gmail.com',
        gender: 'male',
        nationalId: 'A1duyduyduy',
        password: 'A1duyduyduy',
        passwordConfirm: 'A1duyduyduy'
    }
];
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const estatesJson = fs.readFileSync(
    path.join(__dirname, 'estates.data.json'),
    'utf-8'
);
const estates_v1 = JSON.parse(estatesJson);
const maxPrice = 5000000000;
const minPrice = 100000000;
const maxArea = 300;
const minArea = 100;
export const estates_v2 = (estateStatusId, estateTypeId, ownerId) => {
    return estates_v1.map(estate => {
        return {
            ...estate,
            bathRoom: estate.bathRoom || 0,
            bedRoom: estate.bedRoom || 0,
            price:
                Math.floor(Math.random() * (maxPrice - maxPrice / 10 + 1)) +
                minPrice,
            area:
                Math.floor(Math.random() * (maxArea - maxArea / 10 + 1)) +
                minArea,
            currentStatus: estateStatusId,
            type: estateTypeId,
            owner: ownerId
        };
    });
};
