export type RegisterUser = {
    username: string;
    email: string;
    password: string;
};

export type LoginUser = {
    email: string;
    password: string;
};

export type User = {
    id: number;
    username: string;
    email: string;
};
