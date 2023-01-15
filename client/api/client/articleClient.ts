import axios from 'axios';
import {
    CreateArticle,
    GetArticles,
    GetMoreArticles,
    UpdateArticle,
} from 'types';
import { getAxiosConfig } from 'utilities/axios';

const NEXT_AUTHURL = process.env.NEXT_PUBLIC_AUTHURL;
const NEXT_ARTICLEURL = process.env.NEXT_PUBLIC_ARTICLEURL;

const userClient = axios.create({ baseURL: NEXT_AUTHURL });
const articleClient = axios.create({
    baseURL: NEXT_ARTICLEURL,
});

export async function getArticles({
    tag,
    token,
    isGlobal,
    isFavourite,
    userId,
    limit,
    offset,
}: GetArticles) {
    console.log('tag');
    if (tag)
        return await articleClient.get('', { params: { tag, limit, offset } });

    if (!isGlobal && userId && !isFavourite)
        return await articleClient.get(`/author/${userId}`);

    if (isGlobal && !isFavourite && !userId)
        return await articleClient.get('', { params: { limit, offset } });

    if (token && !isGlobal && !isFavourite && !userId && !tag)
        return await articleClient.get('/local', getAxiosConfig(token));

    if (!isGlobal && isFavourite && userId)
        return await articleClient.get(`/author/${userId}/favorite`);
}

export async function getMoreArticles({
    tag,
    token,
    isGlobal,
    limit,
    offset,
}: GetMoreArticles) {
    if (!isGlobal && tag) {
        console.log();
        return await articleClient.get('', { params: { tag, limit, offset } });
    }

    if (isGlobal && !tag)
        return await articleClient.get('', { params: { limit, offset } });

    return await articleClient.get(
        '/local',
        getAxiosConfig(token, limit, offset)
    );
}

export async function getAuthor(id: string) {
    return await userClient.get(`/users/${id}`);
}

export async function createArticle(body: CreateArticle, token: string) {
    return await articleClient.post('', body, getAxiosConfig(token));
}

export async function updateArticle(
    id: string,
    body: UpdateArticle,
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
