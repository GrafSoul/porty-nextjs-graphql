// Apollo
import { useQuery } from '@apollo/client';
import { GET_PORTFOLIO } from '@/apollo/queries';

const useGetPortfolio = (id) => {
    const { loading, error, data } = useQuery(GET_PORTFOLIO, {
        variables: { id },
    });
    const portfolio = (data && data.portfolio) || {};

    return { loading, error, portfolio };
};

export default useGetPortfolio;
