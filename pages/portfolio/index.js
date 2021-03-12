// Core
import { useState } from 'react';
// Router
import Link from 'next/link';
// Axios
import axios from 'axios';
// Component
import PortfolioCard from '@/components/PortfolioCard';

const graphCreatePortfolio = () => {
    const query = `
        mutation CreatePortfolio {
            createPortfolio(input: {
                title: "Work in Uzbekistan"
                company: "Chorsu LTD Co",
                companyWebsite: "www.chorsu.com"
                location: "Uzbekistan, Goparino"
                jobTitle: "Dvornik"
                description: "Было все очень плохо"
                startDate: "01/01/2030"
                endDate: "01/01/2031"
            }) {
                _id
                title
                company
                companyWebsite
                location
                jobTitle
                description
                startDate
                endDate
            }
        }
    `;

    return axios
        .post('http://localhost:3000/graphql', { query })
        .then(({ data: graph }) => graph.data)
        .then((data) => data.createPortfolio);
};

const graphUpdatePortfolio = (id) => {
    const query = `
    mutation UpdatePortfolio {
        updatePortfolio(id: "${id}", input: {   
            title: "Work in Srakastan"
            company: "Churki LTD Co",
            companyWebsite: "www.chorsu.com"
            location: "Uzbekistan, Goparino"
            jobTitle: "Dvornik"
            description: "Было все очень плохо"
            startDate: "01/01/2030"
            endDate: "01/01/2031"     
            }) {
                _id
                title
                company
                companyWebsite
                location
                jobTitle
                description
                startDate
                endDate  
            }
        }
    `;

    return axios
        .post('http://localhost:3000/graphql', { query })
        .then(({ data: graph }) => graph.data)
        .then((data) => data.updatePortfolio);
};

const graphDeletePortfolio = (id) => {
    const query = `
    mutation DeletePortfolio {
        deletePortfolio(id: "${id}")
    }
    `;

    return axios
        .post('http://localhost:3000/graphql', { query })
        .then(({ data: graph }) => graph.data)
        .then((data) => data.deletePortfolio);
};

const fetchPortfolios = () => {
    const query = `
        query Portfolios {
            portfolios {
                _id
                title
                company
                companyWebsite
                location
                jobTitle
                description
                startDate
                endDate
              }
        }
    `;

    return axios
        .post('http://localhost:3000/graphql', { query })
        .then(({ data: graph }) => graph.data)
        .then((data) => data.portfolios);
};

const Portfolio = ({ data }) => {
    const [portfolios, setPortfolios] = useState(data.portfolios);

    const createPortfolio = async () => {
        const newPortfolio = await graphCreatePortfolio();
        const newPortfolios = [...portfolios, newPortfolio];
        setPortfolios(newPortfolios);
    };

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

Portfolio.getInitialProps = async () => {
    const portfolios = await fetchPortfolios();
    return { data: { portfolios } };
};

export default Portfolio;
