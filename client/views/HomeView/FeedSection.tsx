import useArticle from 'store/hooks/useArticle';
import Feed from 'components/Feed';
import FeedSelect from './FeedSelect';
import Pagination from '@/components/Pagination';

type Props = {
    selectedTag: string;
    setSelectedTag: any;
};

export default function FeedSection({ selectedTag, setSelectedTag }: Props) {
    const { isLoading, articles, isLiking, isLoadingMore } = useArticle();

    return (
        <div className="sm:mr-6 sm:order-1 sm:flex-1">
            <FeedSelect selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
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
                                            Loading more articles...
                                        </div>
                                    )}
                                    <Pagination data={articles} />
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
