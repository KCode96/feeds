import { User } from './authType';
import { Request } from 'express';

export * from './authType';
export * from './userType';

export interface RequestWithUser extends Request {
    user: User;
}
