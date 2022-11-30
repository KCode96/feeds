import React from 'react';
import FeedSection from './FeedSection';
import PopularTags from './FeedPopularTags';

export default function HomeView() {
    return (
        <div className="sm:flex">
            <PopularTags />
            <FeedSection />
        </div>
    );
}
