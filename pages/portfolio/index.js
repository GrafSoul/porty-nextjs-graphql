// Apollo HOC
import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/client';
// Router
import Link from 'next/link';
// Hook
import useGetPortfolios from '@/apollo/actions/useGetPortfolios';
// Component
import PortfolioCard from '@/components/portfolio/PortfolioCard';
import Load from '@/components/helpers/Load';

const Portfolio = () => {
    const { loading, error, data } = useGetPortfolios();

    const portfolios = (data && data.portfolios) || [];

    if (loading) return <Load />;
    if (error) return `Error! ${error.message}`;

    return (
        <>
            <section className="section-title">
                <div className="px-2">
                    <div className="pt-5 pb-4">
                        <h1>Portfolios</h1>
                    </div>
                </div>
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
                            </div>
                        ))}
                </div>
            </section>
        </>
    );
};

export default withApollo(Portfolio, { getDataFromTree });
