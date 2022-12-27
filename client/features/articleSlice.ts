import { InitialArticleState } from 'types/articleType';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { articleClient } from 'api/client';
import { Article } from 'types/articleType';

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
    async (id: number, { rejectWithValue }) => {
        try {
            const res = await articleClient.likeArticle(id);
            return res.data.data;
        } catch (err: any) {
            const error = err.response.data.message;
            return rejectWithValue(error);
        }
    }
);

export const unlikeArticle = createAsyncThunk(
    'article/unlikeArticle',
    async (id: number, { rejectWithValue }) => {
        try {
            const res = await articleClient.likeArticle(id);
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
            state.isLoading = false;
            state.articles = action.payload;
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
            const likedArticle = action.payload.id;

            // Update like on states
            state.articles = UpdateLikeOnState(state.articles, likedArticle);
            state.myArticles = UpdateLikeOnState(
                state.myArticles,
                likedArticle
            );

            state.isLiking = false;
        });
    },
});

function UpdateLikeOnState(articles: Article[], likedArticle: number) {
    return articles.map(article => {
        if (article.id == likedArticle) {
            return {
                ...article,
                likesCount: article.likesCount + 1,
            };
        }
        return article;
    });
}

export const { reset } = articleSlice.actions;

export default articleSlice.reducer;
