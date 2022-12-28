import { decodeToken, getToken } from 'utilities/token';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userClient, articleClient } from 'api/client';
import { InitialUserState, Update } from 'types';

export const updateUser = createAsyncThunk(
    '/user/update',
    async ({ id, body }: { id: string; body: Update }, { rejectWithValue }) => {
        try {
            const res = await userClient.update(id, body);
            return res.data;
        } catch (err: any) {
            const error = err.response.data.message;
            return rejectWithValue(error);
        }
    }
);

export const getUserById = createAsyncThunk(
    '/user/get',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await userClient.get(id);
            return res.data.data;
        } catch (err: any) {
            const error = err.response.data.message;
            return rejectWithValue(error);
        }
    }
);

export const getAuthorDetails = createAsyncThunk(
    '/user/getAuthorDetails',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await articleClient.getAuthor(id);
            return res.data.data;
        } catch (err: any) {
            const error = err.response.data.message;
            return rejectWithValue(error);
        }
    }
);

export const followUser = createAsyncThunk(
    '/user/follow',
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

export const unfollowUser = createAsyncThunk(
    '/user/unfollow',
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

const initialState: InitialUserState = {
    isLoading: false,
    isFollowing: false,
    user: null,
    author: null,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset(state) {
            return (state = initialState);
        },
    },
    extraReducers: builder => {
        // Update
        builder.addCase(updateUser.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
        builder.addCase(getAuthorDetails.pending, (state, action) => {
            state.isFollowing = true;
            state.error = null;
        });
        builder.addCase(getAuthorDetails.fulfilled, (state, action) => {
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
        builder.addCase(followUser.pending, (state, action) => {
            state.isFollowing = true;
            state.error = null;
        });
        builder.addCase(followUser.fulfilled, (state, action) => {
            const author = { ...action.payload, isFollowed: true };

            state.author = author;
            state.isFollowing = false;
        });
        builder.addCase(unfollowUser.pending, (state, action) => {
            state.isFollowing = true;
            state.error = null;
        });
        builder.addCase(unfollowUser.fulfilled, (state, action) => {
            const author = { ...action.payload, isFollowed: false };

            state.author = author;
            state.isFollowing = false;
        });
    },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
