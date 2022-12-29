import Feed from '@/components/Feed';
import SelectArticleContainer from '@/components/SelectArticleContainer';
import { getArticles } from 'features/articleSlice';
import { useAppDispatch, useArticle } from '@/store/hooks';

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import AuthorHeader from './AuthorHeader';

export default function AuthorView() {
    const [selected, setSelected] = useState<'default' | 'favourites'>(
        'default'
    );

    const isDefault = selected === 'default';

    const dispatch = useAppDispatch();

    const router = useRouter();

    const authorId = router.query.aid as string;

    const { isLoading, articles } = useArticle();

    console.log(authorId);

    useEffect(() => {
        if (!authorId) return;

        if (isDefault) {
            dispatch(getArticles({ userId: authorId }));
            return;
        }

        dispatch(getArticles({ userId: authorId, isFavourite: true }));
    }, [authorId, selected]);

    return (
        <div>
            <AuthorHeader />
            <div className="container mx-auto py-6">
                <SelectArticleContainer
                    selected={selected}
                    setSelected={setSelected}
                />
                <div className="mt-2">
                    {isLoading ? (
                        <div>Loading articles...</div>
                    ) : (
                        <div>
                            {articles.length == 0 ? (
                                <div>
                                    No favourite articles are here... yet.
                                </div>
                            ) : (
                                <>
                                    {articles.map((a, idx) => (
                                        <Feed
                                            authorName={a.author!.username}
                                            isLiking={false}
                                            key={idx}
                                            {...a}
                                        />
                                    ))}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
