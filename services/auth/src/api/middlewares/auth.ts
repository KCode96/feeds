import { Request, Response, NextFunction } from 'express';
import { RequestWithUser } from '../../types';
import { decodeToken } from '../../utils/token';

// Protect handler that can access only users
export const protect = (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    )
        token = req.headers.authorization.split(' ')[1];

    if (!token) res.status(401).send('Not authorized');

    try {
        const decoded = decodeToken(token as string);
        req.user = decoded.user;
    } catch (err) {
        res.status(401).send('Not authorized');
    }

    return next();
};

// Protect handler that can access only users
export const authorize = (...roles: any) => {
    // return (req: RequestWithUser, res: Request, next: NextFunction) => {
    //     if (!roles.includes(req.user.role)) {
    //         return next();
    //     }
    //     next();
    // };
};
