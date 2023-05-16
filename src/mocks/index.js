import { estates_v2, users } from './data.js';
import createSampleUsers from './user.samples.js';
import createSampleEstates from './estate.samples.js';
import { connectDataBase, disConnectDataBase } from '../database/connectDB.js';
import EstateTypeModel from '../models/estateType.js';
import EstateStatusModel from '../models/estateStatus.js';
import UserModel from '../models/user.js';

await connectDataBase();
await createSampleUsers(users);
const availableStatusEstate = await EstateStatusModel.findOne({
    name: 'Đang mở bán'
});
const houseTypeEstate = await EstateTypeModel.findOne({ name: 'Nhà riêng' });
const owner = await UserModel.findOne({ lastName: 'duy' }).exec();
await createSampleEstates(
    estates_v2(availableStatusEstate.id, houseTypeEstate.id, owner.id)
);
await disConnectDataBase();
console.log('Create samples data successfuly');
