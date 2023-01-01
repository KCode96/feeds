import Image from 'next/image';

import { useAppDispatch, useAuth, useComment } from '@/store/hooks';
import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { User } from 'types';
import { formatDate } from 'utilities/format';
import { useRouter } from 'next/router';
import { deleteComment } from '@/features/commentSlice';
import { getToken } from 'utilities/token';
import Link from 'next/link';

type Props = {
    cid: string;
    body: string;
    commentor: User;
    createdAt: Date;
};

export default function Comment({ cid, body, commentor, createdAt }: Props) {
    const { isAuthenticated } = useAuth();
    const { isDeleting } = useComment();

    const dispatch = useAppDispatch();
    const router = useRouter();

    const aid = router.query.id as string;

    const token = getToken();

    const handleDelete = () => {
        dispatch(deleteComment({ aid, cid, token }));
    };

    return (
        <div className="flex flex-col">
            <div className="p-4 text-sm border-t border-l border-r rounded-tl rounded-tr text-black/90">
                {body}
            </div>
            <div className="py-2 px-4 flex items-center justify-between bg-gray-200/40 border rounded-bl rounded-br">
                <div className="flex items-center">
                    <Image
                        src="/assets/images/smiley-cyrus.jpeg"
                        width={25}
                        height={25}
                        alt="profile"
                        className="rounded-full sm:w-[30px] sm:h-[30px]"
                    />
                    <Link href={`/${commentor.id}`} className="text-[13px] text-blue-500 mx-2 hover:underline hover:text-blue-600" >
                        {commentor.username}
                    </Link>
                    <span className="text-[10px] text-gray-500/80 text-light">
                        {formatDate(createdAt)}
                    </span>
                </div>
                {isAuthenticated && (
                    <button onClick={handleDelete} disabled={isDeleting}>
                        <MdDeleteForever className="text-gray-600/80 transition hover:text-black" />
                    </button>
                )}
            </div>
        </div>
    );
}
