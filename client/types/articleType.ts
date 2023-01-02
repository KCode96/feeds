import { User } from './authType';

export type Article = {
    id: string;
    title: string;
    body: string;
    description: string;
    slug: string;
    likes: string[];
    author: null | User;
    tag: string;
    authorId: string;
    likesCount: number;
    isLiked?: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export type InitialArticleState = {
    isLoadingMore: boolean;
    isLoading: boolean;
    isLiking: boolean;
    articles: [] | Article[];
    error: null | string;
};

export type CreateArticle = {
    title: string;
    description: string;
    body: string;
    tag: string;
};

export type GetArticles = {
    tag: string;
    token: string;
    isGlobal: boolean;
    isFavourite: boolean;
    userId: string;
    limit?: number;
    offset?: number;
};

export type GetMoreArticles = {
    token: string;
    isGlobal: boolean;
    limit?: number;
    offset?: number;
};
