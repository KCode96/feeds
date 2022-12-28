import axios from 'axios';
import { CreateArticle } from 'types/articleType';
import { getAxiosConfig } from 'utilities/axios';

const NEXT_AUTHURL = process.env.NEXT_PUBLIC_AUTHURL;
const NEXT_ARTICLEURL = process.env.NEXT_PUBLIC_ARTICLEURL;

const userClient = axios.create({ baseURL: NEXT_AUTHURL });
const articleClient = axios.create({
    baseURL: NEXT_ARTICLEURL,
});

export async function getGlobalArticles() {
    return await articleClient.get('');
}

export async function getLocalArticles(token: string) {
    return await articleClient.get('/local', getAxiosConfig(token));
}

export async function getArticlesByUserId(id: string) {
    return await articleClient.get(`/author/${id}`);
}

export async function getAuthor(id: string) {
    return await userClient.get(`/users/${id}`);
}

export async function createArticle(body: CreateArticle, token: string) {
    return await articleClient.post('', body, getAxiosConfig(token));
}

export async function likeArticle(id: number, token: string) {
    return await articleClient.get(`${id}/like`, getAxiosConfig(token));
}

export async function unlikeArticle(id: number, token: string) {
    return await articleClient.get(`${id}/unlike`, getAxiosConfig(token));
}
