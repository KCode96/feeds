import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config';
import { User } from '../types';

type JwtPayload = {
    user: User;
    iat: number,
    exp: number
};

export const decodeToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET as string) as JwtPayload;
};
