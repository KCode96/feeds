import { getAllArticles, reset } from '@/features/articleSlice';
import { useAppDispatch } from '@/store/hooks';
import useArticle from '@/store/hooks/useArticle';
import React, { useEffect } from 'react';
import Feed from 'components/Feed';
import FeedPagination from './FeedPagination';
import FeedSelect from './FeedSelect';

export default function FeedSection() {
    const dispatch = useAppDispatch();

    const { isLoading, articles } = useArticle();

    useEffect(() => {
        dispatch(getAllArticles());
    }, []);

    return (
        <div className="sm:mr-6 sm:order-1 sm:flex-1">
            <FeedSelect />
            <div className="">
                {isLoading ? (
                    <div className="mt-2">Loading articles...</div>
                ) : (
                    <div>
                        <div>
                            {articles.map((a, idx) => (
                                <Feed key={idx} {...a} authorName={a.author!.username} />
                            ))}
                        </div>
                        <FeedPagination />
                    </div>
                )}
            </div>
        </div>
    );
}
