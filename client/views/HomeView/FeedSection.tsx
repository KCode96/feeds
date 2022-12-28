import useArticle from 'store/hooks/useArticle';
import Feed from 'components/Feed';
import FeedPagination from './FeedPagination';
import FeedSelect from './FeedSelect';

export default function FeedSection() {
    const { isLoading, articles, isLiking } = useArticle();

    return (
        <div className="sm:mr-6 sm:order-1 sm:flex-1">
            <FeedSelect />
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
                                    <FeedPagination />
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
