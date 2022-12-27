import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userClient } from 'api/client';
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

const initialState: InitialUserState = {
    isLoading: false,
    user: null,
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
    },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
