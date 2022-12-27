import axios from 'axios';
import { Login, Register } from 'types';

const NEXT_AUTHURL = process.env.NEXT_PUBLIC_AUTHURL;

const client = axios.create({ baseURL: NEXT_AUTHURL});


export async function register(body: Register) {
    return await client.post('/register', body);
}

export async function login(body: Login) {
    return await client.post('/login', body);
}

export async function forgotPassword(email: string) {
    return await axios.post('/forgot-password', { email });
}
