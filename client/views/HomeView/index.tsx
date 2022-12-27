import React from 'react';
import FeedSection from './FeedSection';
import PopularTags from './FeedPopularTags';

export default function HomeView() {

    return (
        <div className="container mx-auto pt-4 pb-8 sm:flex">
            <PopularTags />
            <FeedSection />
        </div>
    );
}
