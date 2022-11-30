import React from 'react';

export default function FeedPagination() {
    return (
        <div className="flex mt-6 flex-wrap">
            {[1, 2, 3, 4, 5, 6, 7].map((p, i) => (
                <div
                    key={p}
                    className="cursor-pointer py-2 px-4 border border-gray-500/20 text-blue-600 hover:bg-gray-500/10"
                >
                    {p}
                </div>
            ))}
        </div>
    );
}
