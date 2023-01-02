import { getArticles } from 'features/articleSlice';
import { useAppDispatch, useAuth } from 'store/hooks';
import React, { useEffect, useState } from 'react';
import { getToken } from 'utilities/token';

type Props = {
    selectedTag: string;
    setSelectedTag: any;
};

export default function FeedSelect({ selectedTag, setSelectedTag }: Props) {
    const [selected, setSelected] = useState('global');

    const { isAuthenticated } = useAuth();
    const dispatch = useAppDispatch();

    const token = getToken();

    useEffect(() => {
        if (!selectedTag) return;

        setSelected(selectedTag);
    }, [selectedTag]);

    useEffect(() => {
        if (selectedTag) {
            dispatch(getArticles({ tag: selectedTag, limit: 3, offset: 0 }));
            return;
        }

        if (selected == 'global') {
            dispatch(
                getArticles({ token, isGlobal: true, limit: 3, offset: 0 })
            );
            return;
        }

        dispatch(getArticles({ token, limit: 3, offset: 0 }));
    }, [selected]);

    const handleSelect = (name: string) => {
        setSelected(name);

        setSelectedTag('');
    };

    return (
        <div className="border-b pb-[5px] ">
            {isAuthenticated && (
                <a
                    onClick={() => handleSelect('default')}
                    className={`link-primary px-4 py-2  ${
                        selected == 'default' &&
                        'text-blue-600 border-b-[1.5px] border-blue-600 transition hover:text-blue-600'
                    }`}
                >
                    Your Feed
                </a>
            )}
            <a
                onClick={() => handleSelect('global')}
                className={`link-primary px-4 py-2  ${
                    selected == 'global' &&
                    'text-blue-600 border-b-[1.5px] border-blue-600 transition hover:text-blue-600'
                }`}
            >
                Global Feed
            </a>
            {selectedTag && (
                <a
                    className={`link-primary px-4 py-2  ${
                        selected &&
                        'text-blue-600 border-b-[1.5px] border-blue-600 transition hover:text-blue-600'
                    }`}
                >
                    #{selectedTag}
                </a>
            )}
        </div>
    );
}
