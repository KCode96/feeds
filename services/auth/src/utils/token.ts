import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { JWT_SECRET } from '../config';
import { User } from '../types';

type JwtPayload = {
    user: User;
    iat: number;
    exp: number;
};

export const decodeToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET as string) as JwtPayload;
};

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
