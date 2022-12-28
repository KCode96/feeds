import axios from 'axios';
import { CreateArticle } from 'types/articleType';

const NEXT_AUTHURL = process.env.NEXT_PUBLIC_AUTHURL;
const NEXT_ARTICLEURL = process.env.NEXT_PUBLIC_ARTICLEURL;

const userClient = axios.create({ baseURL: NEXT_AUTHURL });
const articleClient = axios.create({
    baseURL: NEXT_ARTICLEURL,
});

function getConfig(token: string) {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
}

export function getAllArticles() {
    return articleClient.get('');
}

export function getArticlesByUserId(id: string) {
    return articleClient.get(`/author/${id}`);
}

export function getAuthor(id: string) {
    return userClient.get(`/users/${id}`);
}

export function createArticle(body: CreateArticle, token: string) {
    return articleClient.post('', body, getConfig(token));
}

export function likeArticle(id: number, token: string) {
    return articleClient.get(`${id}/like`, getConfig(token));
}

export function unlikeArticle(id: number, token: string) {
    return articleClient.get(`${id}/unlike`, getConfig(token));
}
