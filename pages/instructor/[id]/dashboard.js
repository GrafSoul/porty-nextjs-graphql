// Apollo
import { getDataFromTree } from '@apollo/client/react/ssr';
import useGetUserPortfolios from '../../../apollo/actions/useGetUserPortfolios';
import useGetPortfolios from '../../../apollo/actions/useGetPortfolios';
// Router
import Link from 'next/link';
// Hoc
import withApollo from '@/hoc/withApollo';
import withAuth from '@/hoc/withAuth';
// Date utils
import { formatDate } from '@/utils/date';
// Components
import BaseLayout from '@/layouts/BaseLayout';
import Load from '@/components/helpers/Load';
// Styles
import { Card, Button } from 'react-bootstrap';

const InstructorDashboard = withAuth(
    () => {
        const { loading, error, portfolios } = useGetUserPortfolios();
        const { deletePortfolio } = useGetPortfolios();

        if (loading) return <Load />;
        if (error) return `Error! ${error.message}`;

        return (
            <BaseLayout>
                <div className="bwm-form mt-5">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="page-title">
                                Instructor Portfolios
                            </h1>
                            {portfolios &&
                                portfolios.map((p) => (
                                    <Card key={p._id} className="mb-2">
                                        <Card.Header>{p.jobTitle}</Card.Header>
                                        <Card.Body>
                                            <Card.Title>{p.title}</Card.Title>
                                            <Card.Text>
                                                {formatDate(p.startDate)} -{' '}
                                                {(p.endDate &&
                                                    formatDate(p.endDate)) ||
                                                    'Present'}
                                            </Card.Text>
                                            <Link
                                                href="/portfolio/[id]/edit"
                                                as={`/portfolio/${p._id}/edit`}
                                            >
                                                <a className="btn btn-warning mr-1">
                                                    Update
                                                </a>
                                            </Link>
                                            <Button
                                                onClick={() =>
                                                    deletePortfolio({
                                                        variables: {
                                                            id: p._id,
                                                        },
                                                    })
                                                }
                                                variant="danger"
                                            >
                                                Delete
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                ))}
                        </div>
                    </div>
                </div>
            </BaseLayout>
        );
    },
    ['admin', 'instructor'],
    { ssr: true },
);

export default withApollo(InstructorDashboard, { getDataFromTree });
