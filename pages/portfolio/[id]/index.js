//HOC
import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/client';
// Hook
import useGetPortfolio from '@/apollo/actions/useGetPortfolio';
// Date utils
import { formatDate } from '@/utils/date';
// Component
import Load from '@/components/helpers/Load';
import BaseLayout from '@/layouts/BaseLayout';

const PortfolioDetails = ({ query }) => {
    const { loading, error, portfolio } = useGetPortfolio(query.id);

    if (loading || !portfolio) return <Load />;
    if (error) return `Error! ${error.message}`;

    return (
        <BaseLayout>
            <div className="portfolio-detail">
                <div className="container">
                    <div className="jumbotron">
                        <h1 className="display-3">{portfolio.title}</h1>
                        <p className="lead">{portfolio.jobTitle}</p>
                        <p>
                            <a
                                className="btn btn-lg btn-success"
                                href={portfolio.companyWebsite}
                                role="button"
                            >
                                See Company
                            </a>
                        </p>
                    </div>

                    <div className="row marketing">
                        <div className="col-lg-6">
                            <h4 className="title">Location</h4>
                            <p className="text">{portfolio.location}</p>

                            <h4 className="title">Start Date</h4>
                            <p className="text">
                                {formatDate(portfolio.startDate)}
                            </p>
                        </div>

                        <div className="col-lg-6">
                            {/* TODO: days later... */}
                            <h4 className="title">Days</h4>
                            <p className="text">44</p>

                            <h4 className="title">End Date</h4>
                            <p className="text">
                                {(portfolio.endDate &&
                                    formatDate(portfolio.endDate)) ||
                                    'Present'}
                            </p>
                        </div>
                        <div className="col-md-12">
                            <hr />
                            <h4 className="title">Description</h4>
                            <p>{portfolio.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

PortfolioDetails.getInitialProps = async ({ query }) => {
    return { query };
};

export default withApollo(PortfolioDetails, { getDataFromTree });
