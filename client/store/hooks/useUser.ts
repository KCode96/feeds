import { useAppSelector } from '.';
import { InitialUserState } from 'features/userSlice';

const useUser = () =>
    useAppSelector<InitialUserState>(state => state.user as InitialUserState);
export default useUser;
