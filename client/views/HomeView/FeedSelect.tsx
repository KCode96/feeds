import React, { useState } from 'react';

export default function FeedSelect() {
    const [selected, setSelected] = useState<'default' | 'global'>('global');

    return (
        <div className="border-b pb-[5px] ">
            <a
                onClick={() => setSelected('default')}
                className={`link-primary px-4 py-2  ${
                    selected == 'default' &&
                    'text-blue-600 border-b-[1.5px] border-blue-600 transition hover:text-blue-600'
                }`}
            >
                My Articles
            </a>
            <a
                onClick={() => setSelected('global')}
                className={`link-primary px-4 py-2  ${
                    selected == 'global' &&
                    'text-blue-600 border-b-[1.5px] border-blue-600 transition hover:text-blue-600'
                }`}
            >
                Global Feed
            </a>
        </div>
    );
}
