import axios from 'axios';
import { Update } from 'types';
import { getAxiosConfig } from 'utilities/axios';

const NEXT_AUTHURL = process.env.NEXT_PUBLIC_AUTHURL;

const client = axios.create({ baseURL: NEXT_AUTHURL + '/users' });

export async function update(id: string, body: Update) {
    return await client.put(`/${id}`, body);
}

export async function get(id: string) {
    return await client.get(`/${id}`);
}

export async function follow(userId: string, token: string) {
    return await client.get(`${userId}/follow`, getAxiosConfig(token));
}

export async function unfollow(userId: string, token: string) {
    return await client.get(`${userId}/unfollow`, getAxiosConfig(token));
}
