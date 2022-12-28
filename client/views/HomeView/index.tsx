import React from 'react';
import FeedSection from './FeedSection';
import PopularTags from './TagContainer';

export default function HomeView() {

    return (
        <div className="container mx-auto py-6 pb-8 sm:flex">
            <PopularTags />
            <FeedSection />
        </div>
    );
}
