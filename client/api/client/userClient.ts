import axios from 'axios';
import { Update } from 'types';

const NEXT_AUTHURL = process.env.NEXT_PUBLIC_AUTHURL;

const client = axios.create({ baseURL: NEXT_AUTHURL + '/users' });

export async function update(id: string, body: Update) {
    return await client.put(`/${id}`, body);
}

export async function get(id: string) {
    return await client.get(`/${id}`)
}
