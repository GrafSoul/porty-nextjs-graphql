// Apollo
import { useQuery, useMutation } from '@apollo/client';
import { GET_PORTFOLIOS } from '@/apollo/queries';
import {
    CREATE_PORTFOLIO,
    UPDATE_PORTFOLIO,
    DELETE_PORTFOLIO,
} from '@/apollo/mutation';

const useGetPortfolios = () => {
    // Get portfolios
    const { loading, error, data } = useQuery(GET_PORTFOLIOS);

    // Create portfolio
    const [createPortfolio] = useMutation(CREATE_PORTFOLIO, {
        update(cache, { data: { createPortfolio } }) {
            const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
            cache.writeQuery({
                query: GET_PORTFOLIOS,
                data: { portfolios: [...portfolios, createPortfolio] },
            });
        },
    });

    // Update Portfolios
    const [updatePortfolio] = useMutation(UPDATE_PORTFOLIO);

    // Delete Portfolio
    const [deletePortfolio] = useMutation(DELETE_PORTFOLIO, {
        update(cache, { data: { deletePortfolio } }) {
            const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
            const newPortfolios = portfolios.filter(
                (item) => item._id !== deletePortfolio,
            );
            cache.writeQuery({
                query: GET_PORTFOLIOS,
                data: { portfolios: newPortfolios },
            });
        },
    });

    return {
        loading,
        error,
        data,
        createPortfolio,
        updatePortfolio,
        deletePortfolio,
    };
};

export default useGetPortfolios;
