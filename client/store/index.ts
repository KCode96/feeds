import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import logger from 'redux-logger';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
