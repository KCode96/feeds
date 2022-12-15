import axios from 'axios';
import { LoginUser, RegisterUser } from '../../types';

const NEXT_AUTHURL = process.env.NEXT_PUBLIC_AUTHURL;

export async function register({ username, email, password }: RegisterUser) {
    return await axios.post(`${NEXT_AUTHURL}/register`, {
        username,
        email,
        password,
    });
}

export async function login({ email, password }: LoginUser) {
    return await axios.post(`${NEXT_AUTHURL}/login`, { email, password });
}

export async function forgotPassword(email: string) {
    return await axios.post(`${NEXT_AUTHURL}/forgot-password`, { email });
}
