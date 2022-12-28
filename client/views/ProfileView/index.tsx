import React, { useEffect } from 'react';

import { useAppDispatch, useArticle, useAuth } from 'store/hooks';
import SelectArticleType from './SelectArticleType';
import ProfileHeader from './ProfileHeader';
import { getArticlesByUserId } from 'features/articleSlice';
import Feed from 'components/Feed';

export default function ProfileView() {
    const { isLoading, myArticles } = useArticle();

    const dispatch = useAppDispatch();

    const { user } = useAuth();

    useEffect(() => {
        dispatch(getArticlesByUserId(user!?.id));
    }, []);

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
                            {myArticles.map((a, idx) => (
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
