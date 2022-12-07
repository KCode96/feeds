import { connectDB } from './models';
import express from 'express';
import 'express-async-errors';

import { PORT } from './config';
import startApp from './app';

const app = express();

function startServer() {
    // Connect to database
    connectDB();

    startApp(app);

    app.listen(3001, () => console.log(`Listening on port ${PORT}`));
}

startServer();
