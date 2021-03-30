// Apollo
import { useQuery } from '@apollo/client';
import { GET_USER_PORTFOLIOS } from '../../queries';

const useGetUserPortfolios = () => {
    const { loading, error, data } = useQuery(GET_USER_PORTFOLIOS);

    const portfolios = (data && data.userPortfolios) || [];

    return { loading, error, portfolios };
};

export default useGetUserPortfolios;
