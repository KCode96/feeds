import React from 'react';
import { Article } from 'types/articleType';
import ArticleHeader from './ArticleHeader';
import CommentSection from './CommentSection';

export default function ArticleView({ article }: { article: Article }) {


    return (
        <div>
            <ArticleHeader
                title={article.title}
                author={article.author}
                createdAt={article.createdAt}
                authorId={article.authorId}
            />
            <div className="container mx-auto">
                <div className="py-6 text-black/80 border-b">
                    {article.body}
                </div>
                <CommentSection />
            </div>
        </div>
    );
}
