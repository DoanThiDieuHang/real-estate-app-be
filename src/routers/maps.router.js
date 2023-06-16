import express from 'express';
import { mapPointerController } from '../controllers/mappointer.controller.js';

const mapsRouter = express.Router();

mapsRouter.get('/provinces', mapPointerController.getAllProvinces);
mapsRouter.get(
    '/districts',
    mapPointerController.getAllDistrictsByProvinceCode
);
mapsRouter.get('/wards', mapPointerController.getAllWardsByDistrictCode);
mapsRouter.get('/wards-estate', mapPointerController.getEstateByWards);
mapsRouter.get(
    '/coordinates/',
    mapPointerController.getRelativeCoordinatesByAdress
);
mapsRouter.get('/location', mapPointerController.getLocationByCoordinates);
export default mapsRouter;
