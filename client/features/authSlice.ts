import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { authClient } from 'api/client';
import { InitialAuthState, User, Error, Register } from 'types';
import { decodeToken, removeToken, storeToken } from 'utilities';

export const registerUser = createAsyncThunk(
    '/auth/register',
    async (body: Register, { rejectWithValue }) => {
        try {
            const res = await authClient.register(body);
            return res.data;
        } catch (err: any) {
            const error = err.response.data.message;
            return rejectWithValue(error);
        }
    }
);

export const loginUser = createAsyncThunk(
    '/auth/login',
    async (body: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const res = await authClient.login(body);

            const token = res.data.token;

            // store token in local storage
            storeToken(token);

            const user = decodeToken(token);

            return user;
        } catch (err: any) {
            const error = err.response.data.message;
            return rejectWithValue(error);
        }
    }
);

export const authUser = createAsyncThunk(
    'auth/authUser',
    async (token: string) => {
        const user = decodeToken(token);
        return user;
    }
);

export const logoutUser = createAsyncThunk('/auth/logout', async () =>
    removeToken()
);

export const forgotPassword = createAsyncThunk(
    '/auth/forgotPassword',
    async () => {}
);

const initialState: InitialAuthState = {
    isAuthenticated: false,
    isLoading: false,
    error: null,
    user: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset(state) {
            return (state = initialState);
        },
    },
    extraReducers: builder => {
        // Login
        builder.addCase(loginUser.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload as User;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
        // ReAuth
        builder.addCase(authUser.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.error = null;
            state.user = action.payload as User;
        });
        // Register
        builder.addCase(registerUser.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
        // Logout
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.isAuthenticated = false;
            state.isLoading = false;
            state.user = null;
        });
    },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
