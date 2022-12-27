import cors from 'cors';
import express from 'express';
import 'express-async-errors';

import startApp from './app';
import { PORT } from './config';
import { connectDB } from './models';

const app = express();

app.use(cors());

function startServer() {
    // Connect to database
    connectDB();

    startApp(app);

    app.listen(3001, () => console.log(`Listening on port ${PORT}`));
}

startServer();
