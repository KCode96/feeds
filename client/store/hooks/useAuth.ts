import { useSelector } from 'react-redux';

const useAuth = useSelector<any>(state => state.auth);

export default useAuth;
