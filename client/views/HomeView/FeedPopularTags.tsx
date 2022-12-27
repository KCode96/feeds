import React from 'react';

export default function PopularTags() {
    const tagList: string[] = [
        'software',
        'trending',
        'news',
        'sports',
        'entertainment',
    ];

    return (
        <div className="mb-4 p-4 bg-gray-400/20 rounded-lg w-full sm:w-[240px] sm:h-[200px] sm:order-2 sm:mb-0">
            <h4 className="mb-2">Popular Tags 🔥</h4>
            <div className="flex flex-wrap">
                {tagList.map((t, idx) => (
                    <div
                        key={idx}
                        className="mb-2 mr-1 inline cursor-pointer text-sm bg-gray-700/70 rounded-full px-2 py-1 text-white hover:bg-gray-700"
                    >
                        {t}
                    </div>
                ))}
            </div>
        </div>
    );
}
