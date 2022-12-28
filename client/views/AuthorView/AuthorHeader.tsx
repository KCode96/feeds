import React, { useEffect } from 'react';
import Image from 'next/image';
import { SlUserFollowing, SlUserUnfollow } from 'react-icons/sl';
import { useAppDispatch, useAuth } from 'store/hooks';
import useUser from 'store/hooks/useUser';
import { followUser, getAuthorDetails, unfollowUser } from 'features/userSlice';
import { useRouter } from 'next/router';
import { getToken } from 'utilities/token';

export default function AuthorHeader() {
    const dispatch = useAppDispatch();

    const { isFollowing, author, isLoading } = useUser();
    const { isAuthenticated } = useAuth();

    const router = useRouter();

    const id = router.query.aid as string;

    const token = getToken() as string;

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
        <div className="py-6 bg-gray-500/10 flex flex-col items-center">
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
            <button
                className="flex items-center text-blue-500 border-blue-500 text-xs border px-2 py-1 rounded transition hover:bg-gray-600/10"
                disabled={isFollowing || isLoading}
                onClick={() => {
                    if (author?.isFollowed) handleUnfollow();
                    else handleFollow();
                }}
            >
                {author?.isFollowed ? (
                    <>
                        <SlUserUnfollow />{' '}
                        <span className="ml-1">Unfollow</span>
                    </>
                ) : (
                    <>
                        <SlUserFollowing />
                        <span className="ml-1">Follow</span>
                    </>
                )}
            </button>
        </div>
    );
}
