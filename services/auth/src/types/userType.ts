export type Update = {
    username: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    image?: string | undefined;
    bio?: string | undefined;
};
