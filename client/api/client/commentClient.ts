import axios from 'axios';
import { getAxiosConfig } from 'utilities/axios';

const NEXT_COMMENTURL = process.env.NEXT_PUBLIC_COMMENTURL;

const client = axios.create({ baseURL: NEXT_COMMENTURL });

export function getComments(aid: string) {
    return client.get(`${NEXT_COMMENTURL}/${aid}/comments`);
}

export function postComment(aid: string, comment: string, token: string) {
    return client.post(
        `${NEXT_COMMENTURL}/${aid}/comments`,
        { body: comment },
        getAxiosConfig(token)
    );
}

export function deleteComment(aid: string, cid: string, token: string) {
    return client.delete(
        `${NEXT_COMMENTURL}/${aid}/comments/${cid}`,
        getAxiosConfig(token)
    );
}
