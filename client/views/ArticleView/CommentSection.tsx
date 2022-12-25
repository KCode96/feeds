import React from 'react';

import Comment from './Comment'
import PostCommentEditor from './PostCommentEditor';

export default function CommentSection() {
    const comments = [
        { id: 1, text: 'Hello' },
        { id: 2, text: 'Hello' },
        { id: 3, text: 'Hello' },
        { id: 4, text: 'Hello' },
    ];
    return (
        <div className="py-6">
            <PostCommentEditor />
            <div className='mt-4 space-y-3'>
                {comments.map(c => (
                    <Comment />
                ))}
            </div>
        </div>
    );
}
