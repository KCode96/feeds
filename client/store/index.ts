import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'features/authSlice';
import userReducer from 'features/userSlice';
import articleReducer from 'features/articleSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        article: articleReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
