import { getGlobalArticles, getLocalArticles } from 'features/articleSlice';
import { useAppDispatch, useArticle, useAuth } from 'store/hooks';
import React, { useEffect, useState } from 'react';
import { getToken } from 'utilities/token';

export default function FeedSelect() {
    const [selected, setSelected] = useState<'default' | 'global'>('global');

    const isGlobalFeeds = selected === 'global';

    const { isAuthenticated } = useAuth();
    const dispatch = useAppDispatch();

    const token = getToken();

    useEffect(() => {
        if (isGlobalFeeds) {
            dispatch(getGlobalArticles());
            return;
        }

        console.log('Local');
        dispatch(getLocalArticles(token));
    }, [selected]);

    return (
        <div className="border-b pb-[5px] ">
            {isAuthenticated && (
                <a
                    onClick={() => setSelected('default')}
                    className={`link-primary px-4 py-2  ${
                        selected == 'default' &&
                        'text-blue-600 border-b-[1.5px] border-blue-600 transition hover:text-blue-600'
                    }`}
                >
                    Your Feed
                </a>
            )}
            <a
                onClick={() => setSelected('global')}
                className={`link-primary px-4 py-2  ${
                    selected == 'global' &&
                    'text-blue-600 border-b-[1.5px] border-blue-600 transition hover:text-blue-600'
                }`}
            >
                Global Feed
            </a>
        </div>
    );
}
