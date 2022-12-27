import React from 'react';
import Image from 'next/image';
import { SlUserFollowing, SlUserUnfollow } from 'react-icons/sl';

export default function AuthorHeader() {
    return (
        <div className="py-6 bg-gray-500/10 flex flex-col items-center">
            <Image
                src="/assets/images/smiley-cyrus.jpeg"
                width={80}
                height={80}
                alt="profile"
                className="rounded-full"
            />
            <h1 className="text-center font-bold text-lg py-3">String</h1>
            <button className="flex items-center text-blue-500 border-blue-500 text-xs border px-2 py-1 rounded transition hover:bg-gray-600/10">
                <SlUserFollowing />
                <span className="ml-1">Follow</span>
            </button>
        </div>
    );
}
