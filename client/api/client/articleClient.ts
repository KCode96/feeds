import axios from 'axios';
import { CreateArticle } from 'types/articleType';
import { getAxiosConfig } from 'utilities/axios';

const NEXT_AUTHURL = process.env.NEXT_PUBLIC_AUTHURL;
const NEXT_ARTICLEURL = process.env.NEXT_PUBLIC_ARTICLEURL;

const userClient = axios.create({ baseURL: NEXT_AUTHURL });
const articleClient = axios.create({
    baseURL: NEXT_ARTICLEURL,
});

export async function getArticles({
    token,
    isGlobal,
    isFavourite,
    userId,
}: {
    token: string;
    isGlobal: boolean;
    isFavourite: boolean;
    userId: string;
}) {
    if (!isGlobal && userId && !isFavourite)
        return await articleClient.get(`/author/${userId}`);
    if (isGlobal && !isFavourite && !userId) return await articleClient.get('');
    if (token && !isGlobal && !isFavourite && !userId)
        return await articleClient.get('/local', getAxiosConfig(token));
    if (!isGlobal && isFavourite && userId)
        return await articleClient.get(`/author/${userId}/favorite`);
}

export async function getAuthor(id: string) {
    return await userClient.get(`/users/${id}`);
}

export async function createArticle(body: CreateArticle, token: string) {
    return await articleClient.post('', body, getAxiosConfig(token));
}

export async function updateArticle(
    id: string,
    body: CreateArticle,
    token: string
) {
    return await articleClient.put('/' + id, body, getAxiosConfig(token));
}

export async function deleteArticle(id: string, token: string) {
    return await articleClient.delete('/' + id, getAxiosConfig(token));
}

export async function likeArticle(id: string, token: string) {
    console.log(id);
    return await articleClient.get(`${id}/like`, getAxiosConfig(token));
}

export async function unlikeArticle(id: string, token: string) {
    console.log(id);
    return await articleClient.get(`${id}/unlike`, getAxiosConfig(token));
}
