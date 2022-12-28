import axios from 'axios';

const NEXT_AUTHURL = process.env.NEXT_PUBLIC_AUTHURL;
const NEXT_ARTICLEURL = process.env.NEXT_PUBLIC_ARTICLEURL;

const userClient = axios.create({ baseURL: NEXT_AUTHURL });
const articleClient = axios.create({ baseURL: NEXT_ARTICLEURL });

export async function getAuthor(id: string) {
    return await userClient.get(`/users/${id}`);
}

export async function getAuthorArticle(id: string) {
    return await articleClient.get(`/${id}`);
}
