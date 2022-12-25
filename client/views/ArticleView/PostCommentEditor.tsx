import React from 'react';

export default function PostCommentEditor() {
    return (
        <div className="flex flex-col w-full  max-w-[700px]">
            <textarea
                minLength={6}
                className="w-full outline-none p-4 placeholder:font-light text-sm caret-blue-500 border-t border-l border-r rounded-tl rounded-tr"
                placeholder="Write a comment..."
            />
            <div className="py-2 px-4 flex items-center justify-between bg-gray-200/40 border rounded-bl rounded-br">
                <div className="w-[30px] h-[30px] rounded-full bg-gray-400"></div>
                <button className="text-sm text-white bg-blue-500 px-4  py-1 rounded transition hover:bg-blue-400">
                    Post
                </button>
            </div>
        </div>
    );
}
