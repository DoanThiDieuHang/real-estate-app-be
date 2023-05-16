import { EstateModel } from '../models/index.js';
import { MapPointer } from '../utils/mappointer.js';

async function createSampleEstates(estates) {
    for (let i = 0; i < estates.length; ++i) {
        if (!estates[i].location) {
            //create lat, lng if it does not have
            await new Promise(resolve => setTimeout(resolve, 50));
            const { lat, lng } =
                await MapPointer.getRelativeCoordinatesByAdress(
                    estates[i].address
                );
            const estate = {
                ...estates[i],
                location: { coordinates: [lng, lat] }
            };
            await EstateModel.create(estate);
        }
    }
}

export default createSampleEstates;
