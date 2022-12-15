import jwt_decode, { JwtPayload } from 'jwt-decode';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { authClient } from '../api/client';
import { User } from '../types';

export const registerUser = createAsyncThunk(
    '/auth/register',
    async (
        body: { username: string; email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await authClient.register(body);
            console.log(res.data);
            return res.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const loginUser = createAsyncThunk(
    '/auth/login',
    async (body: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const res = await authClient.login(body);

            const token = res.data.token;
            localStorage.setItem(`token`, JSON.stringify(token));
            const decoded = jwt_decode<any>(token);

            return decoded.user;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const authUser = createAsyncThunk(
    'auth/authUser',
    async (token: string) => {
        const decoded = jwt_decode<any>(token);
        return decoded.user;
    }
);

export const logoutUser = createAsyncThunk('/auth/logout', async () => {
    localStorage.removeItem(`token`);
});
export const forgotPassword = createAsyncThunk(
    '/auth/forgotPassword',
    async () => {}
);

export interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: null | User;
    error: null | string;
}

const initialState: AuthState = {
    isAuthenticated: false,
    isLoading: false,
    error: null,
    user: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset(state, action) {
            state = initialState;
        },
    },
    extraReducers: builder => {
        // Login
        builder.addCase(loginUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload as User;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            console.log(action);
            state.isLoading = false;
            state.error = action.payload as string;
        });
        // ReAuth
        builder.addCase(authUser.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload as User;
        });
        // Register
        builder.addCase(registerUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {});
        builder.addCase(registerUser.rejected, (state, action) => {});
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
