import { Article } from './articleType';
import { User } from './authType';

export interface Author extends User {
    isFollowed: boolean;
}

export type InitialAuthorState = {
    isLiking: boolean;
    article: null | Article;
    isLoading: boolean;
    author: null | Author;
    error: null | string;
    isFollowing: boolean;
    isPostOwner: boolean;
};
