import Link from 'next/link';
import React from 'react';
import { SlUserFollowing, SlUserUnfollow } from 'react-icons/sl';
import { RiHeart3Line } from 'react-icons/ri';
import { formatDate } from 'utilities';
import Image from 'next/image';
import { User } from 'types/authType';

type Props = {
    title: string;
    author: User | null;
    createdAt: Date;
    authorId: string;
};

export default function ArticleHeader({
    title,
    author,
    createdAt,
    authorId,
}: Props) {
    return (
        <div className="bg-[#333333]">
            <div className="container mx-auto py-6 md:py-8 lg:py-12">
                <h1 className="text-white/90 text-2xl font-semibold sm:text-3xl md:text-4xl">
                    {title}
                </h1>
                <div className="flex items-center justify-between mt-4 sm:mt-6">
                    <div className="flex items-center">
                        <Link href={`/${authorId}`}>
                            <Image
                                src="/assets/images/smiley-cyrus.jpeg"
                                width={40}
                                height={40}
                                alt="profile"
                                className="rounded-full"
                            />
                        </Link>
                        <div className="ml-2">
                            <Link href={`/${authorId}`}>
                                <h3 className=" text-sm text-white/90 transition hover:underline">
                                    {author?.username}
                                </h3>
                            </Link>
                            <div className="text-[11px] text-gray-400/80 font-light">
                                {formatDate(createdAt)}
                            </div>
                        </div>
                        <button className="ml-4 flex items-center text-blue-500 border-blue-500 text-xs border px-2 py-1 rounded transition hover:bg-gray-600/10">
                            <SlUserFollowing />
                            <span className="ml-1">Follow</span>
                        </button>
                    </div>
                    <button className="flex items-center text-blue-500 border-blue-500 text-xs border px-2 py-1 rounded transition hover:bg-gray-600/10">
                        <RiHeart3Line />
                        <span className="ml-1">Favorite (99)</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
