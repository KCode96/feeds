import mongoose from 'mongoose';
import c from 'ansi-colors';

import { MONGO_URL } from '../config';

export const connectDB = async () => {
    console.log(MONGO_URL);
    try {
        const con = await mongoose.connect(MONGO_URL as string);
        console.log(c.green('Connected to database!!!'));
    } catch (err) {
        console.log(err);
        console.log(c.red('Failded to connect to database!!!'));
    }
};
