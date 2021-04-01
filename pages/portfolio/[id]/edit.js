// Apollo
import useGetPortfolio from '@/apollo/actions/useGetPortfolio';
import useGetPortfolios from '@/apollo/actions/useGetPortfolios';

// Components
import PortfolioForm from '@/components/forms/PortfolioForm';
// Hoc
import withApollo from '@/hoc/withApollo';
import withAuth from '@/hoc/withAuth';
import BaseLayout from '@/layouts/BaseLayout';
// Router
import { useRouter } from 'next/router';
import Link from 'next/link';

const PortfolioEdit = () => {
    const router = useRouter();
    const { updatePortfolio, error } = useGetPortfolios();
    const { id } = router.query;
    const { portfolio } = useGetPortfolio(id);

    const errorMessage = (error) => {
        return (
            (error.graphQLErrors && error.graphQLErrors[0].message) ||
            'Ops something went wrong...'
        );
    };

    const handleSubmit = (data) => {
        console.log(data);
        updatePortfolio({
            variables: { id, ...data },
        });
    };

    return (
        <BaseLayout>
            <div className="bwm-form mt-5">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <h1 className="page-title">Edit Portfolio</h1>
                        {portfolio && (
                            <PortfolioForm
                                initialData={portfolio}
                                onSubmit={(data) => handleSubmit(data)}
                            />
                        )}
                        {error && (
                            <div className="alert alert-danger">
                                {errorMessage(error)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default withApollo(withAuth(PortfolioEdit, ['admin', 'instructor']));
