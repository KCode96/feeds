import axios from 'axios';

const API_URL = 'http://localhost:3001';

export async function login({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    return await axios.post(`http://localhost:3001/login`, { email, password });
}

export async function register({
    username,
    email,
    password,
}: {
    username: string;
    email: string;
    password: string;
}) {
    return await axios.post(`http://localhost:3001/register`, {
        username,
        email,
        password,
    });
}
