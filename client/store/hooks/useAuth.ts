import { useAppSelector } from '.';
import { AuthState } from '../../features/authSlice';

const useAuth = () =>
    useAppSelector<AuthState>(state => state.auth as AuthState);
export default useAuth;
