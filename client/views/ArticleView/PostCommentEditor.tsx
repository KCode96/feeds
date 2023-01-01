import React, { FormEvent, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { postComment } from '@/features/commentSlice';
import { useAppDispatch, useComment } from '@/store/hooks';
import { getToken } from 'utilities/token';

export default function PostCommentEditor() {
    const [comment, setComment] = useState('');

    const { isPosting } = useComment();
    const dispatch = useAppDispatch();
    const token = getToken();

    const router = useRouter();

    const aid = router.query.id as string;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        dispatch(postComment({ aid, comment, token }));

        setComment('');
    };

    return (
        <form className="flex flex-col" onSubmit={handleSubmit}>
            <textarea
                minLength={8}
                className="w-full outline-none p-4 placeholder:font-light text-sm caret-blue-500 border-t border-l border-r rounded-tl rounded-tr"
                placeholder="Write a comment..."
                required
                value={comment}
                onChange={e => setComment(e.target.value)}
            />
            <div className="py-2 px-4 flex items-center justify-between bg-gray-200/40 border rounded-bl rounded-br">
                <Image
                    src="/assets/images/smiley-cyrus.jpeg"
                    width={30}
                    height={30}
                    alt="profile"
                    className="rounded-full sm:w-[30px] sm:h-[30px]"
                />
                <button
                    type="submit"
                    className="text-sm text-white bg-blue-500 px-4  py-1 rounded transition hover:bg-blue-400 disabled:bg-blue-400"
                    disabled={isPosting}
                >
                    Post
                </button>
            </div>
        </form>
    );
}
