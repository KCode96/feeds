import { useAuthor } from '@/store/hooks';
import React from 'react';
import ArticleHeader from './ArticleHeader';
import CommentSection from './CommentSection';

export default function ArticleView() {
    const { article } = useAuthor();

    return (
        <div>
            <ArticleHeader />
            <div className="container mx-auto">
                <div className="py-6 text-black/80 border-b">
                    {article?.body}
                </div>
                <CommentSection />
            </div>
        </div>
    );
}
