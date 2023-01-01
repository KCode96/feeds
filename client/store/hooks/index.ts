import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import useAuth from './useAuth';
import useArticle from './useArticle';
import useAuthor from './useAuthor';
import useComment from './useComment';
import { RootState } from '..';
import { AppDispatch } from '..';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAuth, useArticle, useAuthor, useComment };
