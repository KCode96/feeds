import { InitialAuthorState } from 'types/authorType';
import { useAppSelector } from '.';

const useArticle = () =>
    useAppSelector<InitialAuthorState>(
        state => state.author as InitialAuthorState
    );

export default useArticle;
