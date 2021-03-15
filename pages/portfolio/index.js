// Core
import { useState, useEffect } from 'react';
// Router
import Link from 'next/link';
// Apollo
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_PORTFOLIOS } from '@/apollo/queries';
import { CREATE_PORTFOLIO } from '@/apollo/mutation';
// Axios
import axios from 'axios';
// Component
import PortfolioCard from '@/components/PortfolioCard';

const graphUpdatePortfolio = (id) => {
    return axios
        .post('http://localhost:3000/graphql', { query })
        .then(({ data: graph }) => graph.data)
        .then((data) => data.updatePortfolio);
};

const graphDeletePortfolio = (id) => {
    return axios
        .post('http://localhost:3000/graphql', { query })
        .then(({ data: graph }) => graph.data)
        .then((data) => data.deletePortfolio);
};

const Portfolio = () => {
    const [portfolios, setPortfolios] = useState([]);

    const [getPortfolios, { loading, error, data }] = useLazyQuery(
        GET_PORTFOLIOS,
    );

    const [createPortfolio] = useMutation(CREATE_PORTFOLIO, {
        update(cache, { data: { createPortfolio } }) {
            const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
            cache.writeQuery({
                query: GET_PORTFOLIOS,
                data: { portfolios: [...portfolios, createPortfolio] },
            });
        },
    });

    // const onPortfolioCreated = (dataPortfolio) => {
    //     setPortfolios([...portfolios, dataPortfolio.createPortfolio]);
    // };

    // const [
    //     createPortfolio,
    //     { data: dataPortfolio },
    // ] = useMutation(CREATE_PORTFOLIO, { onCompleted: onPortfolioCreated });

    useEffect(() => {
        getPortfolios();
    }, []);

    if (
        data &&
        data.portfolios.length > 0 &&
        (portfolios.length === 0 ||
            data.portfolios.length !== portfolios.length)
    ) {
        setPortfolios(data.portfolios);
    }

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const updatePortfolio = async (id) => {
        const updatedPortfolio = await graphUpdatePortfolio(id);
        const index = portfolios.findIndex((item) => item._id === id);
        const newPortfolios = portfolios.slice();
        newPortfolios[index] = updatedPortfolio;
        setPortfolios(newPortfolios);
    };

    const deletePortfolio = async (id) => {
        const deletedId = await graphDeletePortfolio(id);
        const index = portfolios.findIndex((item) => item._id === deletedId);
        const newPortfolios = portfolios.slice();
        newPortfolios.splice(index, 1);
        setPortfolios(newPortfolios);
    };

    return (
        <>
            <section className="section-title">
                <div className="px-2">
                    <div className="pt-5 pb-4">
                        <h1>Portfolios</h1>
                    </div>
                </div>
                <button
                    className="btn btn-primary mb-3"
                    onClick={createPortfolio}
                >
                    Create Portfolio
                </button>
            </section>
            <PortfolioCard />
            <section className="">
                <div className="row">
                    {portfolios &&
                        portfolios.map((portfolio) => (
                            <div key={portfolio._id} className="col-md-4">
                                <Link
                                    href="/portfolio/[id]"
                                    as={`/portfolio/${portfolio._id}`}
                                >
                                    <a className="card-link">
                                        <PortfolioCard portfolio={portfolio} />
                                    </a>
                                </Link>
                                <button
                                    className="btn btn-sm btn-warning ml-2 mt-2"
                                    onClick={() =>
                                        updatePortfolio(portfolio._id)
                                    }
                                >
                                    Update Portfolio
                                </button>

                                <button
                                    className="btn btn-sm btn-danger ml-2 mt-2"
                                    onClick={() =>
                                        deletePortfolio(portfolio._id)
                                    }
                                >
                                    Delete Portfolio
                                </button>
                            </div>
                        ))}
                </div>
            </section>
        </>
    );
};

export default Portfolio;
