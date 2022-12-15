import { Request, Response, Express } from 'express';
import cors from 'cors';

import { userService } from '../services';
import { validateRequest } from './middlewares';
import { userSchema } from '../schemas';

export default function (app: Express) {
    app.get('/api/users', async (req: Request, res: Response) => {
        const users = await userService.getAllUsers();

        res.status(200).json({ message: '', data: users, success: true });
    });

    app.get(
        '/api/users/:id',

        validateRequest(userSchema.getUser),
        async (req: Request, res: Response) => {
            const id = req.params.id;
            const user = await userService.getUserById(id);

            res.status(200).json({ message: '', data: user, success: true });
        }
    );

    app.put(
        '/api/users/:id',

        validateRequest(userSchema.getUser),
        async (req: Request, res: Response) => {}
    );
}
