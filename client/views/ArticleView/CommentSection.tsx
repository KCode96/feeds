import { useState } from 'react';
import Image from 'next/image';

import Comment from './Comment';
import { useAuth, useAuthor, useComment } from 'store/hooks';
import PostCommentEditor from './PostCommentEditor';
import { formatDate } from 'utilities/format';
import { FiEdit2 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { MdDeleteForever } from 'react-icons/md';
import { Button } from 'components/Buttons';
import { articleClient } from 'api/client';
import { getToken } from 'utilities/token';
import Link from 'next/link';
import CommentList from './CommentList';

export default function CommentSection() {
    const [isDeleting, setIsDeleting] = useState(false);
    const { isPostOwner, author, article } = useAuthor();
    const { isAuthenticated } = useAuth();

    const router = useRouter();

    const token = getToken();
    const aid = router.query.id as string;

    const handleDelete = async () => {
        setIsDeleting(true);

        try {
            await articleClient.deleteArticle(aid, token);
            setIsDeleting(false);
            router.push('/');
        } catch (err) {
            console.log(err);
        }

        setIsDeleting(false);
    };

    return (
        <>
            <div className=" mx-auto py-6  max-w-[700px]">
                <div className='mb-4'>
                    {isPostOwner && (
                        <div className="flex items-center mb-6">
                            <Image
                                src="/assets/images/smiley-cyrus.jpeg"
                                width={25}
                                height={25}
                                alt="profile"
                                className="mr-2 rounded-full sm:w-[30px] sm:h-[30px]"
                            />
                            <div>
                                <div className="text-sm text-blue-500">
                                    {author?.username}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {formatDate(article?.createdAt)}
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                                <Button
                                    isSubmitting={false}
                                    onClick={() => {
                                        router.push('/editor/' + article?.id);
                                    }}
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
                        </div>
                    )}
                    {isAuthenticated ? (
                        <PostCommentEditor />
                    ) : (
                        <div className="text-black/90 text-sm">
                            <Link
                                href="/signin"
                                className="text-blue-500 mr-1 hover:underline hover:text-blue-600"
                            >
                                Sign in
                            </Link>
                            or
                            <Link
                                href="signup"
                                className="text-blue-500 mx-1 hover:underline hover:text-blue-600"
                            >
                                Sign up
                            </Link>
                            to add comments on this article.
                        </div>
                    )}
                </div>
                <CommentList aid={aid} />
            </div>
        </>
    );
}
