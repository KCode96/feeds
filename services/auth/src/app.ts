import express, { Express } from 'express';

import { user, auth } from './api';
import { notFoundHandler, errorHandler } from './api/middlewares';

const startApp = (app: Express) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    auth(app);
    user(app);

    app.use(errorHandler);
    app.use(notFoundHandler);
};

export default startApp;
