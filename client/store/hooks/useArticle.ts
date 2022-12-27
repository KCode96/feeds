import { InitialArticleState } from 'types/articleType';
import { useAppSelector } from '.';

const useArticle = () =>
    useAppSelector<InitialArticleState>(
        state => state.article as InitialArticleState
    );

export default useArticle;
