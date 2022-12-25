import React from 'react';
import ArticleHeader from './ArticleHeader';
import CommentSection from './CommentSection';

export default function ArticleView() {
    return (
        <div>
            <ArticleHeader />
            <div className="container mx-auto">
                <div className="py-6 text-black/80 border-b">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Molestias, suscipit esse quia cupiditate unde sunt quas amet
                    reprehenderit inventore ducimus deserunt eum animi iste
                    praesentium quaerat delectus nesciunt assumenda magni dolor
                    aspernatur consequatur! Tempora nihil delectus recusandae
                    ducimus nobis asperiores qui magni. Non minus soluta
                    consequatur possimus molestias adipisci, sapiente rem
                    facere? Accusamus voluptas optio odit veritatis, sint cum
                    ipsam?
                </div>
                <CommentSection />
            </div>
        </div>
    );
}
