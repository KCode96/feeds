import { User } from './authType';

export interface Author extends User {
    isFollowed: boolean;
}
