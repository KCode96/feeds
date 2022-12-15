import axios from 'axios';

const NEXT_AUTHURL = process.env.NEXT_AUTHURL;

export async function register({
    username,
    email,
    password,
}: {
    username: string;
    email: string;
    password: string;
}) {
    return await axios.post(`${NEXT_AUTHURL}/register`, {
        username,
        email,
        password,
    });
}

export async function login({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    return await axios.post(`${NEXT_AUTHURL}/login`, { email, password });
}

export async function forgotPassword(email: string) {
    return await axios.post(`${NEXT_AUTHURL}/forgot-password`, { email });
}
