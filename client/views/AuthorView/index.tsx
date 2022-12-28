import Feed from '@/components/Feed';
import SelectArticleContainer from '@/components/SelectArticleContainer';
import { getArticlesByAuthorId } from '@/features/articleSlice';
import { useAppDispatch, useArticle } from '@/store/hooks';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import AuthorHeader from './AuthorHeader';

export default function AuthorView() {
    const [selected, setSelected] = useState<'default' | 'favourites'>(
        'default'
    );

    const dispatch = useAppDispatch();

    const router = useRouter();

    const authorId = router.query.aid;

    const { authorArticles, isLoading } = useArticle();

    useEffect(() => {
        if (!authorId) return;
        dispatch(getArticlesByAuthorId(authorId as string));
    }, [authorId]);

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
                            {authorArticles.map((a, idx) => (
                                <Feed
                                    authorName={a.author!.username}
                                    isLiking={false}
                                    key={idx}
                                    {...a}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
