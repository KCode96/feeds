export type Comment = {};

export interface InitialCommentState {
    isPosting: boolean;
    isDeleting: boolean;
    isLoading: boolean;
    comments: Comment[];
    error: null | string;
}
