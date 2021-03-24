// Core
import { useEffect } from 'react';
// Router
import { useRouter } from 'next/router';

const Redirect = ({ to }) => {
    const router = useRouter();

    useEffect(() => {
        router.push({ pathname: to });
    }, []);

    return null;
};

export default Redirect;
