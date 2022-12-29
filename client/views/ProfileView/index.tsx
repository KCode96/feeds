import { useArticle, useAuth } from 'store/hooks';
import SelectArticleType from './SelectArticleType';
import ProfileHeader from './ProfileHeader';
import Feed from 'components/Feed';

export default function ProfileView() {
    const { isLoading, articles } = useArticle();

    const { user } = useAuth();

    return (
        <div>
            <ProfileHeader />
            <div className="py-6 container mx-auto">
                <SelectArticleType />
                <div className="mt-2">
                    {isLoading ? (
                        <div>Loading articles...</div>
                    ) : (
                        <div>
                            {articles.map((a, idx) => (
                                <Feed
                                    isLiking={false}
                                    key={idx}
                                    {...a}
                                    authorName={user!.username}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
