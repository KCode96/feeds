import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { InitialCommentState } from 'types/commentType';
import { commentClient } from 'api/client';

export const getCommentsInArticle = createAsyncThunk(
    '/comment/getCommentsInArticle',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await commentClient.getComments(id);
            return res.data.data.comments;
        } catch (err: any) {
            const error = err.response.data.message;
            return rejectWithValue(error);
        }
    }
);

export const postComment = createAsyncThunk(
    '/comments/postComment',
    async (
        {
            aid,
            comment,
            token,
        }: { aid: string; comment: string; token: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await commentClient.postComment(aid, comment, token);
            return res.data.data;
        } catch (err: any) {
            const error = err.response.data.message;
            return rejectWithValue(error);
        }
    }
);

export const deleteComment = createAsyncThunk(
    '/comments/deleteComment',
    async (
        { aid, cid, token }: { aid: string; cid: string; token: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await commentClient.deleteComment(aid, cid, token);
            return res.data.data;
        } catch (err: any) {
            const error = err.response.data.message;
            return rejectWithValue(error);
        }
    }
);

const initialState: InitialCommentState = {
    isDeleting: false,
    isLoading: false,
    isPosting: false,
    comments: [],
    error: null,
};

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        reset(state) {
            return (state = initialState);
        },
    },

    extraReducers: builder => {
        builder.addCase(getCommentsInArticle.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getCommentsInArticle.fulfilled, (state, action) => {
            state.isLoading = false;
            state.comments = action.payload;
        });
        builder.addCase(postComment.pending, (state, action) => {
            state.isPosting = true;
            state.error = null;
        });
        builder.addCase(postComment.fulfilled, (state, action) => {
            state.isPosting = false;
            state.comments = [...state.comments, action.payload];
        });
        builder.addCase(deleteComment.pending, (state, action) => {
            state.isDeleting = true;
            state.error = null;
        });
        builder.addCase(deleteComment.fulfilled, (state, action) => {
            state.isDeleting = false;
            state.comments = action.payload.comments;
        });
    },
});

export default commentSlice.reducer;
