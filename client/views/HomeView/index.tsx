import React, { useState } from 'react';
import FeedSection from './FeedSection';
import PopularTags from './TagContainer';

export default function HomeView() {
    const [selectedTag, setSelectedTag] = useState('');

    return (
        <div className="container mx-auto py-6 pb-8 sm:flex">
            <PopularTags
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
            />
            <FeedSection
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
            />
        </div>
    );
}
