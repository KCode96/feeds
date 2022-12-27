import React from 'react';
import Image from 'next/image';

export default function PostCommentEditor() {
    return (
        <div className="flex flex-col">
            <textarea
                minLength={8}
                className="w-full outline-none p-4 placeholder:font-light text-sm caret-blue-500 border-t border-l border-r rounded-tl rounded-tr"
                placeholder="Write a comment..."
            />
            <div className="py-2 px-4 flex items-center justify-between bg-gray-200/40 border rounded-bl rounded-br">
                <Image
                    src="/assets/images/smiley-cyrus.jpeg"
                    width={30}
                    height={30}
                    alt="profile"
                    className="rounded-full sm:w-[30px] sm:h-[30px]"
                />
                <button className="text-sm text-white bg-blue-500 px-4  py-1 rounded transition hover:bg-blue-400">
                    Post
                </button>
            </div>
        </div>
    );
}
