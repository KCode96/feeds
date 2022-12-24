import { useAppSelector } from '.';
import { InitialAuthState } from 'features/authSlice';

const useAuth = () =>
    useAppSelector<InitialAuthState>(state => state.auth as InitialAuthState);
export default useAuth;
