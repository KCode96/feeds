import useArticle from 'store/hooks/useArticle';
import Feed from 'components/Feed';
import FeedSelect from './FeedSelect';
import Pagination from '@/components/Pagination';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAuth } from '@/store/hooks';
import { getToken } from 'utilities/token';
import { getArticles } from '@/features/articleSlice';

type Props = {
    selectedTag: string;
    setSelectedTag: any;
};

export default function FeedSection({ selectedTag, setSelectedTag }: Props) {
    const [selected, setSelected] = useState('global');

    const dispatch = useAppDispatch();

    const { isLoading, articles, isLiking, isLoadingMore, articlesCount } =
        useArticle();
    const {} = useAuth();

    const token = getToken();

    useEffect(() => {
        if (!selectedTag) return;

        setSelected(selectedTag);
    }, [selectedTag]);

    useEffect(() => {
        if (selectedTag) {
            dispatch(getArticles({ tag: selectedTag, limit: 5, offset: 0 }));
            return;
        }

        if (selected == 'global') {
            dispatch(
                getArticles({ token, isGlobal: true, limit: 5, offset: 0 })
            );
            return;
        }
        dispatch(getArticles({ token, limit: 5, offset: 0 }));
    }, [selected]);

    return (
        <div className="sm:mr-6 sm:order-1 sm:flex-1">
            <FeedSelect
                selected={selected}
                setSelected={setSelected}
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
            />
            <div className="">
                {isLoading ? (
                    <div className="mt-2">Loading articles...</div>
                ) : (
                    <div>
                        <div>
                            {articles.length == 0 ? (
                                <div className="mt-2">
                                    No articles are here... yet.
                                </div>
                            ) : (
                                <>
                                    {articles.map((a, idx) => (
                                        <Feed
                                            key={idx}
                                            {...a}
                                            authorName={a.author!.username}
                                            isLiking={isLiking}
                                        />
                                    ))}
                                    {isLoadingMore && (
                                        <div className="mt-2">
                                            Loading articles...
                                        </div>
                                    )}
                                    <Pagination
                                        selectedTag={selectedTag}
                                        totalCount={articlesCount}
                                        isGlobal={selected === 'global'}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
