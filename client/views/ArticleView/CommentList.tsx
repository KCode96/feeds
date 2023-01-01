import { getCommentsInArticle } from '@/features/commentSlice';
import { useAppDispatch, useComment } from '@/store/hooks';
import { useEffect } from 'react';

import Comment from './Comment';

type Props = {
    aid: string;
};

export default function CommentList({ aid }: Props) {
    const { isLoading, comments } = useComment();

    const dispatch = useAppDispatch();

    useEffect(() => {

        if (!aid) return;
        
        dispatch(getCommentsInArticle(aid));
    }, [aid]);

    return (
        <div className="space-y-3">
            {isLoading ? (
                <div className="text-center">Loading comments...</div>
            ) : (
                <>
                    {comments.map((c: any, idx) => (
                        <Comment
                            cid={c.id}
                            body={c.body}
                            commentor={c.commentor}
                            createdAt={c.createdAt}
                            key={idx}
                        />
                    ))}
                </>
            )}
        </div>
    );
}
