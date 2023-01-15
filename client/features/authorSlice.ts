import { InitialAuthorState } from 'types/authorType';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { articleClient, authorClient, userClient } from 'api/client';
import { decodeToken, getToken } from 'utilities/token';

export const getAuthor = createAsyncThunk(
    '/author/getAuthor',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await authorClient.getAuthor(id);
            return res.data.data;
        } catch (err: any) {
            const error = err.response.data.message;
            return rejectWithValue(error);
        }
    }
);

export const getAuthorArticle = createAsyncThunk(
    '/author/getAuthorArticle',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await authorClient.getAuthorArticle(id);
            return res.data.data;
        } catch (err: any) {
            const error = err.response.data.message;
            return rejectWithValue(error);
        }
    }
);

export const likeAuthorArticle = createAsyncThunk(
    '/author/likeAuthorArticle',
    async (
        { id, token }: { id: string; token: string },
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

export const unlikeAuthorArticle = createAsyncThunk(
    '/author/unlikeAuthorArticle',
    async (
        { id, token }: { id: string; token: string },
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

export const followAuthor = createAsyncThunk(
    '/author/followAuthor',
    async (
        { id, token }: { id: string; token: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await userClient.follow(id, token);
            return res.data.data;
        } catch (err: any) {
            const error = err.response.data.message;
            return rejectWithValue(error);
        }
    }
);

export const unfollowAuthor = createAsyncThunk(
    '/author/unfollowAuthor',
    async (
        { id, token }: { id: string; token: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await userClient.unfollow(id, token);
            return res.data.data;
        } catch (err: any) {
            const error = err.response.data.message;
            return rejectWithValue(error);
        }
    }
);

const initialState: InitialAuthorState = {
    isLiking: false,
    isLoading: false,
    isFollowing: false,
    isPostOwner: false,
    author: null,
    error: null,
    article: null,
};

export const authorSlice = createSlice({
    name: 'author',
    initialState,
    reducers: {
        reset(state) {
            return (state = initialState);
        },
    },
    extraReducers: builder => {
        builder.addCase(getAuthor.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getAuthor.fulfilled, (state, action) => {
            const token = getToken();

            let formattedPayload = action.payload;

            // If not logged in
            if (!token) {
                state.author = { ...formattedPayload, isFollowed: false };
                state.isFollowing = false;
                return;
            } else {
                const userId = decodeToken(token).id;
                if (action.payload) {
                    if (
                        !action.payload!.followers.find(
                            (f: string) => f == userId
                        )
                    )
                        formattedPayload.isFollowed = false;
                    else formattedPayload.isFollowed = true;
                }
            }

            state.author = formattedPayload;
            state.isFollowing = false;
        });
        builder.addCase(getAuthorArticle.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getAuthorArticle.fulfilled, (state, action) => {
            const token = getToken();

            // If not logged in
            if (!token) {
                const author = { ...action.payload.author, isFollowed: false };
                const article = { ...action.payload, isLiked: false };

                delete article.author;

                state.article = article;
                state.author = author;
            } else {
                const user = decodeToken(token);
                const id = user.id;

                const article = { ...action.payload };

                const author = { ...action.payload.author };

                if (author.followers.find((fid: string) => fid == id))
                    author.isFollowed = true;
                else author.isFollowed = false;

                if (action.payload.likes.find((l: string) => l == id))
                    article.isLiked = true;
                else article.isLiked = false;

                console.log(author);

                state.article = article;
                state.isPostOwner = article.authorId == id;
                state.author = author;
            }

            state.isLoading = false;
        });
        builder.addCase(getAuthorArticle.rejected, (state, action) => {
            state.error = action.payload as string;
        });
        builder.addCase(likeAuthorArticle.pending, (state, action) => {
            state.isLiking = true;
        });
        builder.addCase(likeAuthorArticle.fulfilled, (state, action) => {
            state.article!.isLiked = true;
            state.isLiking = false;
        });
        builder.addCase(unlikeAuthorArticle.pending, (state, action) => {
            state.isLiking = true;
        });
        builder.addCase(unlikeAuthorArticle.fulfilled, (state, action) => {
            state.article!.isLiked = false;
            state.isLiking = false;
        });
        builder.addCase(followAuthor.pending, (state, action) => {
            state.isFollowing = true;
        });
        builder.addCase(followAuthor.fulfilled, (state, action) => {
            state.author!.isFollowed = true;
            state.isFollowing = false;
        });
        builder.addCase(unfollowAuthor.pending, (state, action) => {
            state.isFollowing = true;
        });
        builder.addCase(unfollowAuthor.fulfilled, (state, action) => {
            state.author!.isFollowed = false;
            state.isFollowing = false;
        });
    },
});

export const { reset } = authorSlice.actions;

export default authorSlice.reducer;
