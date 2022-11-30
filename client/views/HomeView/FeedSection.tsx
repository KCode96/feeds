import React from 'react';
import Feed from './Feed';
import FeedPagination from './FeedPagination';

export default function FeedSection() {
    return (
        <div className="sm:mr-6 sm:order-1 sm:flex-1">
            <div className="border-b py-3">
                <div className="cursor-pointer border-b-2 border-blue-600 inline py-3 text-blue-600">
                    Global Feed
                </div>
            </div>
            <div>
                {[2, 3, 4, 0, 10, 9].map(i => (
                    <Feed />
                ))}
            </div>
            <FeedPagination />
        </div>
    );
}
