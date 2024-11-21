import { useSelector } from 'react-redux';

function useCurrentUser() {
    const currentUser = useSelector((state) => state.user.currentUser);
    return currentUser;
}
export default useCurrentUser;
