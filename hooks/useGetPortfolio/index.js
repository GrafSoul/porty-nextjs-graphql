// React
import { useState, useEffect } from 'react';
// Apollo
import { useLazyQuery } from '@apollo/client';
import { GET_PORTFOLIO } from '@/apollo/queries';

const useGetPortfolio = (id) => {
    const [portfolio, setPortfolio] = useState(null);

    const [getPortfolio, { loading, error, data }] = useLazyQuery(
        GET_PORTFOLIO,
    );

    useEffect(() => {
        getPortfolio({
            variables: { id },
        });
    }, []);

    if (data && !portfolio) setPortfolio(data.portfolio);

    return { loading, error, portfolio };
};

export default useGetPortfolio;
