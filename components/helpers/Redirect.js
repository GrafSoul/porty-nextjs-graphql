// Core
import { useEffect } from 'react';
// Router
import { useRouter } from 'next/router';

const Redirect = ({ to, query }) => {
    const router = useRouter();

    useEffect(() => {
        router.push({ pathname: to, query });
    }, []);

    return null;
};

export default Redirect;
