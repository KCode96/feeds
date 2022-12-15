import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authClient } from '../api/client';

export const registerUser = createAsyncThunk(
    '/auth/register',
    async (
        body: { username: string; email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await authClient.register(body);
            console.log('auth', res);
            return res.data;
        } catch (err) {
            console.log(err);
            return rejectWithValue(err);
        }
    }
);

export const loginUser = createAsyncThunk(
    '/auth/login',
    async (body: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const res = await authClient.login(body);
            console.log('auth', res);
            return res;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const logoutUser = createAsyncThunk('/auth/logout', async () => {});
export const forgotPassword = createAsyncThunk(
    '/auth/forgotPassword',
    async () => {}
);

export interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    error: null | string;
}

const initialState: AuthState = {
    isAuthenticated: false,
    isLoading: false,
    error: null,
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
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message as string;
        });
        // Register
        builder.addCase(registerUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {});
        builder.addCase(registerUser.rejected, (state, action) => {});
        // Logout
        builder.addCase(logoutUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.isAuthenticated = false;
            state.isLoading = false;
        });
    },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
