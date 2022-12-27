import { InitialArticleState } from 'types/articleType';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { articleClient } from 'api/client';
import { Article } from 'types/articleType';
import { decodeToken, getToken } from 'utilities/token';

export const getAllArticles = createAsyncThunk(
    'article/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const res = await articleClient.getAllArticles();
            return res.data.data;
        } catch (err: any) {
            const error = err.response.data.message;
            return rejectWithValue(error);
        }
    }
);

export const getArticlesByUserId = createAsyncThunk(
    'article/getAllByUserId',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await articleClient.getArticlesByUserId(id);
            return res.data.data;
        } catch (err: any) {
            const error = err.response.data.message;
            return rejectWithValue(error);
        }
    }
);

export const likeArticle = createAsyncThunk(
    'article/likeArticle',
    async (
        { id, token }: { id: number; token: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await articleClient.likeArticle(id, token);
            return res.data.data;
        } catch (err: any) {
            const error = err.response.data.message;
            return rejectWithValue(error);
        }
    }
);

export const unlikeArticle = createAsyncThunk(
    'article/unlikeArticle',
    async (
        { id, token }: { id: number; token: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await articleClient.unlikeArticle(id, token);
            return res.data.data;
        } catch (err: any) {
            const error = err.response.data.message;
            return rejectWithValue(error);
        }
    }
);

const initialState: InitialArticleState = {
    isLoading: false,
    isLiking: false,
    articles: [],
    myArticles: [],
    favouriteArticles: [],
    error: null,
};

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        reset(state) {
            return (state = initialState);
        },
    },
    extraReducers: builder => {
        // Get all articles
        builder.addCase(getAllArticles.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getAllArticles.fulfilled, (state, action) => {
            const user = decodeToken(getToken());
            const id = user.id;

            const formattedPayload = action.payload.map((article: Article) => {
                if (article.likes.findIndex(i => i == id) == 0) {
                    return { ...article, isLiked: true };
                }

                return { ...article, isLiked: false };
            });

            state.articles = formattedPayload;

            state.isLoading = false;
        });
        builder.addCase(getAllArticles.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
        // Get all articles by user id
        builder.addCase(getArticlesByUserId.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getArticlesByUserId.fulfilled, (state, action) => {
            state.isLoading = false;
            state.myArticles = action.payload;
        });
        builder.addCase(getArticlesByUserId.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
        // Like artile
        builder.addCase(likeArticle.pending, (state, action) => {
            state.isLiking = true;
        });
        builder.addCase(likeArticle.fulfilled, (state, action) => {
            const likedArticleId = action.payload.id;

            // Update like on states
            state.articles = UpdateLikeOnState(state.articles, likedArticleId);
            state.myArticles = UpdateLikeOnState(
                state.myArticles,
                likedArticleId
            );

            state.isLiking = false;
        });
        // Unlike article
        builder.addCase(unlikeArticle.pending, (state, action) => {
            state.isLiking = true;
        });
        builder.addCase(unlikeArticle.fulfilled, (state, action) => {
            const unlikedArticleId = action.payload.id;

            state.articles = UpdateUnlikeOnState(
                state.articles,
                unlikedArticleId
            );

            state.isLiking = false;
        });
    },
});

function UpdateLikeOnState(articles: Article[], likedArticleId: number) {
    return articles.map(article => {
        if (article.id == likedArticleId) {
            return {
                ...article,
                likesCount: article.likesCount + 1,
                isLiked: true,
            };
        }
        return article;
    });
}

function UpdateUnlikeOnState(articles: Article[], unlikedArticleId: number) {
    return articles.map(article => {
        if (article.id == unlikedArticleId) {
            return {
                ...article,
                likesCount: article.likesCount - 1,
                isLiked: false,
            };
        }
        return article;
    });
}

export const { reset } = articleSlice.actions;

export default articleSlice.reducer;
