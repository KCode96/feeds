import { useAuthor } from '@/store/hooks';
import React from 'react';
import Image from 'next/image';

import Comment from './Comment';
import PostCommentEditor from './PostCommentEditor';
import { formatDate } from 'utilities/format';
import { FiEdit2 } from 'react-icons/fi';
import router from 'next/router';
import { MdDeleteForever } from 'react-icons/md';
import { Button } from 'components/Buttons';

export default function CommentSection() {
    const { isPostOwner, author, article } = useAuthor();

    const comments = [{ id: 1, text: 'Hello' }];

    
    return (
        <div className=" mx-auto py-6  max-w-[700px]">
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
                            isSubmitting={false}
                            onClick={() => {}}
                            className="border-red-500 text-red-500 hover:bg-red-500"
                        >
                            <MdDeleteForever />
                            <span className="ml-1">Delete</span>
                        </Button>
                    </div>
                </div>
            )}
            <PostCommentEditor />
            <div className="mt-4 space-y-3">
                {comments.map((c, idx) => (
                    <Comment key={idx} />
                ))}
            </div>
        </div>
    );
}
