import { useAuth } from 'store/hooks';
import { useRouter } from 'next/router';
import React from 'react';
import { SlUserFollowing, SlUserUnfollow } from 'react-icons/sl';

interface Props {
    isFollowing: boolean;
    isFollowed: boolean;
    className?: string;
    handleFollow: () => void;
    handleUnfollow: () => void;
}

export default function FollowButton({
    isFollowed,
    isFollowing,
    handleFollow,
    handleUnfollow,
    className,
}: Props) {
    const { push } = useRouter();
    const { isAuthenticated } = useAuth();

    const handleClick = () => {
        if (!isAuthenticated) return push('signin');
        if (isFollowed) return handleUnfollow();
        handleFollow();
    };

    return (
        <button
            className={`${className} ${
                isFollowed
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white'
            } ml-4 flex items-center  border-blue-500 text-xs border px-2 py-1 rounded transition `}
            disabled={isFollowing}
            onClick={handleClick}
        >
            {isFollowed ? (
                <>
                    <SlUserUnfollow /> <span className='ml-1'>Unfollow</span>
                </>
            ) : (
                <>
                    <SlUserFollowing />
                    <span className="ml-1">Follow</span>
                </>
            )}
        </button>
    );
}
