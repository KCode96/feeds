import axios from 'axios';

const NEXT_TAGURL = process.env.NEXT_PUBLIC_TAGURL;

const tagClient = axios.create({
    baseURL: NEXT_TAGURL,
});

export async function getAllTags() {
    return await tagClient.get('');
}
