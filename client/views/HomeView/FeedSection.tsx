import React, { useState } from 'react';
import Feed from './Feed';
import FeedPagination from './FeedPagination';
import FeedSelect from './FeedSelect';

export default function FeedSection() {
    return (
        <div className="sm:mr-6 sm:order-1 sm:flex-1">
            <FeedSelect />
            <div>
                {[2, 3, 4, 0, 10, 9].map(i => (
                    <Feed />
                ))}
            </div>
            <FeedPagination />
        </div>
    );
}
