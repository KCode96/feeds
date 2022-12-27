import { User } from './authType';

export type Article = {
    id: number;
    title: string;
    body: string;
    description: string;
    slug: string;
    likes: number;
    author: null | User;
    authorId: string;
    likesCount: number;
    createdAt: Date;
    updatedAt: Date;
};

export type InitialArticleState = {
    isLoading: boolean;
    isLiking: boolean;
    articles: [] | Article[];
    error: null | string;
    myArticles: [] | Article[];
    favouriteArticles: [] | Article[];
};

export type CreateArticle = {
    title: string;
    description: string;
    body: string;
};
