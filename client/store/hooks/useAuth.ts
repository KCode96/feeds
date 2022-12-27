import { useAppSelector } from '.';
import { InitialAuthState } from 'types';

const useAuth = () =>
    useAppSelector<InitialAuthState>(state => state.auth as InitialAuthState);
export default useAuth;
