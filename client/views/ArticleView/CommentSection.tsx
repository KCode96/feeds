import React from 'react';

import Comment from './Comment';
import PostCommentEditor from './PostCommentEditor';

export default function CommentSection() {
    const comments = [
        { id: 1, text: 'Hello' },
        { id: 2, text: 'Hello' },
        { id: 3, text: 'Hello' },
        { id: 4, text: 'Hello' },
    ];
    return (
        <div className=" mx-auto py-6  max-w-[700px]">
            <PostCommentEditor />
            <div className="mt-4 space-y-3">
                {comments.map((c, idx) => (
                    <Comment key={idx} />
                ))}
            </div>
        </div>
    );
}
