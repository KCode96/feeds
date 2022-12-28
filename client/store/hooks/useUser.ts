import { useAppSelector } from '.';
import { InitialUserState } from 'types/userType';

const useUser = () =>
    useAppSelector<InitialUserState>(state => state.user as InitialUserState);
export default useUser;
