// Apollo
import useGetPortfolio from '@/apollo/actions/useGetPortfolio';
import useGetPortfolios from '@/apollo/actions/useGetPortfolios';
// Toast
import { toast } from 'react-toastify';
// Components
import PortfolioForm from '@/components/forms/PortfolioForm';
// Hoc
import withApollo from '@/hoc/withApollo';
import withAuth from '@/hoc/withAuth';
import BaseLayout from '@/layouts/BaseLayout';
// Router
import { useRouter } from 'next/router';

const PortfolioEdit = () => {
    const router = useRouter();
    const { updatePortfolio, loading, error } = useGetPortfolios();
    const { id } = router.query;
    const { portfolio } = useGetPortfolio(id);

    const errorMessage = (error) => {
        return (
            (error.graphQLErrors && error.graphQLErrors[0].message) ||
            'Ops something went wrong...'
        );
    };

    const handlePortfolioUpdate = async (data) => {
        await updatePortfolio({ variables: { id, ...data } });
        toast.success('Portfolio has been updated!', { autoClose: 2000 });
        setTimeout(() => {
            router.back();
        }, 3000);
    };

    if (loading || !portfolio) return <Load />;
    if (error) return `Error! ${error.message}`;

    return (
        <BaseLayout>
            <div className="bwm-form mt-5">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <h1 className="page-title">Edit Portfolio</h1>
                        {portfolio && (
                            <PortfolioForm
                                initialData={portfolio}
                                onSubmit={handlePortfolioUpdate}
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
