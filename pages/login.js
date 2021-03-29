// Apollo
import { useSignIn } from '../apollo/actions/useSignIn';
import withApollo from '@/hoc/withApollo';
// Component
import LoginForm from '@/components/forms/LoginForm';
import Redirect from '@/components/helpers/Redirect';
import BaseLayout from '@/layouts/BaseLayout';

const Login = () => {
    const [signIn, { data, loading, error }] = useSignIn();

    const errorMessage = (error) => {
        return (
            (error.graphQLErrors && error.graphQLErrors[0].message) ||
            'Ops something went wrong...'
        );
    };

    return (
        <BaseLayout>
            <div className="bwm-form mt-5">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <h1 className="page-title">Login</h1>
                        <LoginForm
                            loading={loading}
                            onSubmit={(signInData) =>
                                signIn({ variables: signInData })
                            }
                        />
                        {data && data.signIn && <Redirect to="/" />}
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

export default withApollo(Login);
