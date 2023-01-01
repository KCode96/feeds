import { InitialCommentState } from 'types/commentType';
import { useAppSelector } from '.';

const useArticle = () =>
    useAppSelector<InitialCommentState>(
        state => state.comment as InitialCommentState
    );

export default useArticle;
