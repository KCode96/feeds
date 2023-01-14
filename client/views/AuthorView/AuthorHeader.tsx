import React, { useEffect } from 'react';
import Image from 'next/image';
import { useAppDispatch, useAuth } from 'store/hooks';
import useUser from 'store/hooks/useUser';
import { followUser, getAuthorDetails, unfollowUser } from 'features/userSlice';
import { useRouter } from 'next/router';
import { getToken } from 'utilities/token';
import { FollowButton } from '@/components/Buttons';

export default function AuthorHeader() {
    const dispatch = useAppDispatch();

    const { isFollowing, author } = useUser();
    const { isAuthenticated } = useAuth();

    const router = useRouter();

    const id = router.query.aid as string;

    const token = getToken();

    useEffect(() => {
        dispatch(getAuthorDetails(id));
    }, [id]);

    const handleFollow = () => {
        // If not authorized, redirect to sign in page
        if (!isAuthenticated) router.push('/signin');

        dispatch(followUser({ id, token }));
    };

    const handleUnfollow = () => {
        dispatch(unfollowUser({ id, token }));
    };

    return (
        <div className="py-6 bg-gray-500/10 flex flex-col items-center md:py-8 lg:py-12 xl:py-16">
            <Image
                src="/assets/images/smiley-cyrus.jpeg"
                width={80}
                height={80}
                alt="profile"
                className="rounded-full"
            />
            <h1 className="text-center font-bold text-lg py-3">
                {author?.username}
            </h1>
            <FollowButton
                isFollowing={isFollowing}
                isFollowed={author?.isFollowed as boolean}
                handleFollow={handleFollow}
                handleUnfollow={handleUnfollow}
            />
        </div>
    );
}
