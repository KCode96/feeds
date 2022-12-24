import { User } from './authType';

export type Update = {
    username: string;
    email: string;
    bio: string;
    password: string;
    image: string;
};

export type InitialUserState = {
    isLoading: boolean;
    user: User | null;
    error: null | string;
};
