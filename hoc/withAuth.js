import { useGetUser } from '@/apollo/actions/useGetUser';
import Redirect from '@/components/helpers/Redirect';

export default (WrappedComponent, role) => (props) => {
    const { data: { user } = {}, loading, error } = useGetUser({
        fetchPolicy: 'network-only',
    });

    if (!loading && (!user || error) && typeof window !== 'undefined') {
        return <Redirect to="/login" />;
    }

    //  TODO: Send a message to login page
    if (user) {
        if (role && !role.includes(user.role)) {
            return <Redirect to="/" />;
        }
        return <WrappedComponent {...props} />;
    }

    return <p>Authenticating...</p>;
};
