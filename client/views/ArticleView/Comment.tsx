import React from 'react';
import { MdDeleteForever } from 'react-icons/md';

export default function Comment() {
    return (
        <div className="flex flex-col w-full  max-w-[700px]">
            <div className="p-4 text-sm caret-blue-500 border-t border-l border-r rounded-tl rounded-tr text-black/90">
                Hello comment_!
            </div>
            <div className="py-2 px-4 flex items-center justify-between bg-gray-200/40 border rounded-bl rounded-br">
                <div className="flex items-center">
                    <div className="w-[25px] h-[25px] rounded-full bg-gray-400"></div>
                    <span className="text-[13px] text-blue-500 mx-2">Moon</span>
                    <span className="text-[10px] text-gray-500/80 text-light">
                        December 26, 2022
                    </span>
                </div>
                <button>
                    <MdDeleteForever className="text-gray-600/80" />
                </button>
            </div>
        </div>
    );
}
