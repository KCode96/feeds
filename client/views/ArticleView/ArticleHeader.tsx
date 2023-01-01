import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { formatDate, getToken } from 'utilities';
import { useAppDispatch, useAuthor } from 'store/hooks';
import { useRouter } from 'next/router';
import {
    followAuthor,
    getAuthor,
    getAuthorArticle,
    likeAuthorArticle,
    unfollowAuthor,
    unlikeAuthorArticle,
} from 'features/authorSlice';
import { Button, FollowButton, LikeButton } from 'components/Buttons';
import { FiEdit2 } from 'react-icons/fi';
import { MdDeleteForever } from 'react-icons/md';
import { articleClient } from 'api/client';

export default function ArticleHeader() {
    const [isDeleting, setIsDeleting] = useState(false);
    const { isFollowing, isLiking, author, article, isPostOwner } = useAuthor();
    const router = useRouter();

    const dispatch = useAppDispatch();

    const token = getToken();

    const id = router.query.id as string;
    const authorId = article?.authorId;

    useEffect(() => {
        if (!id) return;

        dispatch(getAuthorArticle(id));

        if (authorId) dispatch(getAuthor(article?.authorId));

    }, [id, authorId]);

    const handleFollow = () => {
        dispatch(followAuthor({ id: authorId as string, token }));
    };
    const handleUnfollow = () => {
        dispatch(unfollowAuthor({ id: authorId as string, token }));
    };

    const handleLike = () => {
        dispatch(likeAuthorArticle({ id, token }));
    };

    const handleUnlike = () => {
        dispatch(unlikeAuthorArticle({ id, token }));
    };

    const handleDelete = async () => {
        setIsDeleting(true);

        try {
            await articleClient.deleteArticle(id, token);
            setIsDeleting(false);
            router.push('/');
        } catch (err) {
            console.log(err);
        }

        setIsDeleting(false);
    };

    return (
        <div className="bg-[#333333]">
            <div className="container mx-auto py-6 md:py-8 lg:py-12 xl:py-16">
                <h1 className="text-white/90 text-2xl font-semibold sm:text-3xl md:text-4xl">
                    {article?.title}
                </h1>
                <div className="flex items-center justify-between mt-4 sm:mt-6">
                    <div className="flex items-center">
                        <Link href={`/${article?.authorId}`}>
                            <Image
                                src="/assets/images/smiley-cyrus.jpeg"
                                width={35}
                                height={35}
                                alt="profile"
                                className="rounded-full"
                            />
                        </Link>
                        <div className="ml-2">
                            <Link href={`/${article?.authorId}`}>
                                <h3 className=" text-sm text-white/90 transition hover:underline">
                                    {author?.username}
                                </h3>
                            </Link>
                            <div className="text-[11px] text-gray-400/80 font-light">
                                {formatDate(article?.createdAt)}
                            </div>
                        </div>
                        {isPostOwner ? (
                            <div className="ml-4 space-x-2 flex items-center">
                                <Button
                                    isSubmitting={false}
                                    onClick={() =>
                                        router.push('/editor/' + article?.id)
                                    }
                                >
                                    <FiEdit2 />
                                    <span className="ml-1">Edit</span>
                                </Button>
                                <Button
                                    isSubmitting={isDeleting}
                                    onClick={handleDelete}
                                    className="border-red-500 text-red-500 hover:bg-red-500"
                                >
                                    <MdDeleteForever />
                                    <span className="ml-1">Delete</span>
                                </Button>
                            </div>
                        ) : (
                            <FollowButton
                                isFollowing={isFollowing}
                                isFollowed={author?.isFollowed as boolean}
                                handleFollow={handleFollow}
                                handleUnfollow={handleUnfollow}
                            />
                        )}
                    </div>
                    {!isPostOwner && (
                        <LikeButton
                            isLiked={article?.isLiked as boolean}
                            handleLike={handleLike}
                            handleUnlike={handleUnlike}
                            isLiking={isLiking}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
