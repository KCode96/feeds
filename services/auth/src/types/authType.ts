export type Register = {
    username: string;
    email: string;
    password: string;
};

export type Login = {
    email: string;
    password: string;
};

export type User = {
    id: string;
    username: string;
    email: string;
    password?: string;
    role: 'user' | 'admin';
    createdAt?: Date;
    updatedAt?: Date;
    image?: string | undefined;
    bio?: string | undefined;
};
