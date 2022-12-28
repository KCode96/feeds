import { followUser } from './../services/userService';
import { Request, Response, Express } from 'express';

import { userService } from '../services';
import { protect, validateRequest } from './middlewares';

import { userSchema } from '../schemas';

export default function (app: Express) {
    app.get('/api/users', async (req: Request, res: Response) => {
        const users = await userService.getAllUsers();

        res.status(200).json({
            message: '',
            data: { users, usersCount: users.length ?? 0 },
            success: true,
        });
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
        async (req: Request, res: Response) => {
            const id = req.params.id;
            const update = await userService.updateUser(id, req.body);

            res.status(200).json({
                message: '',
                data: update,
                success: true,
            });
        }
    );

    app.delete(
        '/api/users/:id',
        validateRequest(userSchema.getUser),
        async (req: Request, res: Response) => {
            const id = req.params.id;
            const user = await userService.deleteUser(id);

            res.status(200).json({
                message: '',
                data: user,
                success: true,
            });
        }
    );

    app.get(
        '/api/users/:id/follow',
        validateRequest(userSchema.getUser),
        protect,
        async (req: Request, res: Response) => {
            const id = req.params.id;
            const followerId = req.user!.id;

            const user = await userService.followUser(id, followerId);

            if (!user) {
                res.status(400).json({
                    data: null,
                    message: 'User not found',
                    success: false,
                });
            }

            res.status(200).json({
                message: '',
                success: true,
                data: user,
            });
        }
    );

    app.get(
        '/api/users/:id/unfollow',
        validateRequest(userSchema.getUser),
        protect,
        async (req: Request, res: Response) => {
            const id = req.params.id;
            const followerId = req.user!.id;

            const user = await userService.unfollowUser(id, followerId);

            if (!user) {
                res.status(400).json({
                    data: null,
                    message: '',
                    success: true,
                });
            }

            res.status(200).json({
                data: user,
                message: '',
                success: true,
            });
        }
    );
}
