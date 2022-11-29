import { Express, Request, Response } from 'express';

import { validateRequest } from './middlewares';
import { authSchema } from '../schemas';
import { authService } from '../services';

export default function (app: Express) {
    // POST /register
    app.post(
        '/register',
        validateRequest(authSchema.registerUser),
        async (req: Request, res: Response) => {

            const user = await authService.registerUser(req.body);

            res.status(201).json({ success: true, data: user, message: '' });
        }
    );

    // POST /login
    app.post(
        '/login',
        validateRequest(authSchema.loginUser),
        async (req: Request, res: Response) => {
            const token = await authService.loginUser(req.body);

            res.status(200).json({
                success: true,
                message: '',
            });
        }
    );

    // POST /forgot-password
    app.post(
        '/forgot-password',
        validateRequest(authSchema.forgotPassword),
        async (req: Request, res: Response) => {
            const email = req.body.email;
            await authService.forgotPassword(email);

            res.status(200).json({
                success: true,
                message: '',
            });
        }
    );
}
