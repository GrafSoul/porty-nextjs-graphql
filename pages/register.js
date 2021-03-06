// Apollo
import { useMutation } from '@apollo/client';
import { SIGN_UP } from '@/apollo/mutation';
import withApollo from '@/hoc/withApollo';
// Component
import RegisterForm from '@/components/forms/RegisterForm';
import Redirect from '@/components/helpers/Redirect';
import BaseLayout from '@/layouts/BaseLayout';

const Register = () => {
    const [signUp, { data, error }] = useMutation(SIGN_UP);

    const errorMessage = (error) => {
        return (
            (error.graphQLErrors && error.graphQLErrors[0].message) ||
            'Ops something went wrong...'
        );
    };

    const handleRegister = (registerData) => {
        signUp({
            variables: {
                ...registerData,
            },
        });
    };

    return (
        <BaseLayout>
            <div className="bwm-form mt-5">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <h1 className="page-title">Register</h1>
                        <RegisterForm onSubmit={handleRegister} />
                        {data && data.signUp && (
                            <Redirect
                                to="/login"
                                query={{ message: 'LOGGED_IN' }}
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

export default withApollo(Register);
