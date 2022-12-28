import Link from 'next/link';
import Image from 'next/image';
import { RiHeart3Line } from 'react-icons/ri';
import { Article } from 'types/articleType';
import { formatDate } from 'utilities/format';
import { useAppDispatch, useAuth } from '@/store/hooks';
import { useRouter } from 'next/router';
import { likeArticle, unlikeArticle } from 'features/articleSlice';
import { getToken } from 'utilities/token';

interface Props extends Article {
    authorName: string;
    isLiking: boolean;
}

export default function Feed({
    id,
    title,
    description,
    likesCount,
    createdAt,
    authorName,
    authorId,
    isLiked,
    isLiking,
}: Props) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const dispatch = useAppDispatch();

    const token = getToken();

    const handleLike = () => {
        // check if user is authenticated
        if (!isAuthenticated) return router.push('/signin');

        dispatch(likeArticle({ id, token }));
    };

    const handleUnlike = () => {
        dispatch(unlikeArticle({ id, token }));
    };

    return (
        <div className="py-5 border-b border-gray-500/20">
            <div className="flex justify-between items-start">
                <div className="flex">
                    <Link href={'/' + authorId}>
                        <Image
                            src="/assets/images/smiley-cyrus.jpeg"
                            className="rounded-full"
                            width={40}
                            height={40}
                            alt="profile image"
                        />
                    </Link>
                    <div className="ml-3">
                        <Link href={'/' + authorId}>
                            <div className="cursor-pointer text-blue-500  hover:underline hover:text-blue-400">
                                {authorName}
                            </div>
                        </Link>
                        <div className="text-[11px] text-gray-500/80 font-light">
                            {formatDate(createdAt)}
                        </div>
                    </div>
                </div>
                <button
                    className={`${
                        isLiked
                            ? 'text-white bg-blue-500 hover:bg-blue-600'
                            : 'text-blue-500'
                    } flex items-center border-[1px] py-1 px-2 text-xs  border-blue-500 rounded cursor-pointer  hover:bg-blue-500 transition    hover:text-white`}
                    onClick={() => {
                        if (isLiked) handleUnlike();
                        else handleLike();
                    }}
                    type="button"
                    disabled={isLiking}
                >
                    <RiHeart3Line className="mr-1 " />
                    {likesCount}
                </button>
            </div>
            <Link href={`/articles/${id}`}>
                <div className="my-2">
                    <h1 className="text-lg font-semibold">{title}</h1>
                    <p className="text-gray-500/70 text-sm">{description}</p>
                </div>
                <div className="flex justify-between items-center">
                    <div className="cursor-pointer text-xs text-gray-500/60 transition hover:text-blue-600">
                        Read more...
                    </div>
                    <div className="flex items-center text-[11px] text-gray-500/60">
                        <div className="border rounded-full px-2 py-1">
                            software
                        </div>
                        <div className="border rounded-full px-2 py-1 ml-1">
                            trending
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
