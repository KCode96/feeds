import { User } from './src/types/authType';

export {};

declare global {
    namespace Express {
        export interface Request {
            user?: User;
        }
    }
}
