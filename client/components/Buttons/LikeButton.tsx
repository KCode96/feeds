import { useAuth } from '@/store/hooks';
import { useRouter } from 'next/router';
import React from 'react';
import { RiHeart3Line } from 'react-icons/ri';

interface Props {
    isLiking: boolean;
    isLiked: boolean;
    handleUnlike: () => void;
    handleLike: () => void;
    className?: string;
}

export default function LikeButton({
    isLiking,
    isLiked,
    handleLike,
    handleUnlike,
    className,
}: Props) {
    const { push } = useRouter();
    const { isAuthenticated } = useAuth();

    const handleClick = () => {
        if (!isAuthenticated) return push('/signin');
        if (isLiked) return handleUnlike();
        handleLike();
    };
    return (
        <button
            className={`${className} ${
                isLiked
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'text-blue-500 hover:bg-blue-500 hover:text-white'
            } flex items-center border-blue-500 text-xs border px-2 py-1 rounded transition`}
            onClick={handleClick}
            disabled={isLiking}
        >
            <RiHeart3Line />
            <span className="ml-1">Like</span>
        </button>
    );
}
