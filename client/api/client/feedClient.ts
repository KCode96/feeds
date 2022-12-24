import axios from 'axios';
import { Login, Register } from 'types';

const NEXT_AUTHURL = process.env.NEXT_PUBLIC_AUTHURL;

const client = axios.create({ baseURL: NEXT_AUTHURL });

export async function getGlobalFeeds() {
    return await client.get('');
}
