// Apollo HOC
import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/client';
// Router
import Link from 'next/link';
// Hook
import useGetPortfolios from '@/apollo/actions/useGetPortfolios';
// Component
import PortfolioCard from '@/components/PortfolioCard';

const Portfolio = () => {
    const {
        loading,
        error,
        data,
        createPortfolio,
        updatePortfolio,
        deletePortfolio,
    } = useGetPortfolios();

    const portfolios = (data && data.portfolios) || [];

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

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
                                        updatePortfolio({
                                            variables: { id: portfolio._id },
                                        })
                                    }
                                >
                                    Update Portfolio
                                </button>

                                <button
                                    className="btn btn-sm btn-danger ml-2 mt-2"
                                    onClick={() =>
                                        deletePortfolio({
                                            variables: { id: portfolio._id },
                                        })
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

export default withApollo(Portfolio, { getDataFromTree });
