export interface InitialAuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: null | User;
    error: null | string;
}

export type User = {
    image: string;
    bio: string;
    id: string;
    username: string;
    email: string;
    role: 'user' | 'admin';
    createdAt: Date;
    updatedAt: Date;
};

export type Register = {
    username: string;
    email: string;
    password: string;
};

export type Login = {
    email: string;
    password: string;
};

export type AuthResponse<T> = {
    data: T | null;
    message: string;
    success: boolean;
};
