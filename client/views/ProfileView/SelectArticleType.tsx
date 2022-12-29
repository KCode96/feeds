import { getArticles } from '@/features/articleSlice';
import { useAppDispatch, useAuth } from '@/store/hooks';
import { useEffect, useState } from 'react';

export default function SelectArticleType() {
    const [selected, setSelected] = useState<'default' | 'favourites'>(
        'default'
    );

    const isDefault = selected == 'default';

    const dispatch = useAppDispatch();

    const { user } = useAuth();

    useEffect(() => {
        if (isDefault) dispatch(getArticles({ userId: user!?.id }));
        else dispatch(getArticles({ isFavourite: true, userId: user!?.id }));
    }, [selected]);

    return (
        <div className="border-b pb-[5px] ">
            <a
                onClick={() => setSelected('default')}
                className={`link-primary px-4 py-2  ${
                    selected == 'default' &&
                    'text-blue-600 border-b-[1.5px] border-blue-600 hover:text-blue-600'
                }`}
            >
                My Articles
            </a>
            <a
                onClick={() => setSelected('favourites')}
                className={`link-primary px-4 py-2  ${
                    selected == 'favourites' &&
                    'text-blue-600 border-b-[1.5px] border-blue-600 hover:text-blue-600'
                }`}
            >
                Favorited Articles
            </a>
        </div>
    );
}
