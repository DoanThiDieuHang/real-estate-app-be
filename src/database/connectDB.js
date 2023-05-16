import mongoose from 'mongoose';
import { databaseConfig } from '../configs/constants.js';

const connectDataBase = async () => {
    mongoose.set('strictQuery', true);
    try {
        await mongoose.connect(databaseConfig.DATABASE_URL, {
            dbName: `${databaseConfig.DATABASE_NAME}`,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to DB');
    } catch (err) {
        throw new Error('Failed to connect DB');
    }
};

const disConnectDataBase = async () => {
    try {
        return mongoose.disconnect();
    } catch (error) {
        throw new Error(error);
    }
};

export { connectDataBase, disConnectDataBase };
